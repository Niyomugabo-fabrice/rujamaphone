export type SearchableProduct = {
  id: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  description?: string | null;
  type?: string | null;
};

export type RankedSearchResult<T> = {
  item: T;
  score: number;
  matchType: "exact" | "prefix" | "substring" | "fuzzy" | "related";
};

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchTokens(value: string): string[] {
  const normalized = normalizeSearchText(value);
  return normalized ? normalized.split(" ") : [];
}

export function rankProducts<T extends SearchableProduct>(
  products: T[],
  rawQuery: string
): RankedSearchResult<T>[] {
  const query = normalizeSearchText(rawQuery);
  const queryTokens = getSearchTokens(query);

  if (!query) {
    return products.map((item, index) => ({
      item,
      score: index,
      matchType: "related",
    }));
  }

  return products
    .map((item, index) => {
      const rank = rankProduct(item, query, queryTokens);
      return rank
        ? {
            item,
            score: rank.score + index / 10000,
            matchType: rank.matchType,
          }
        : null;
    })
    .filter((result): result is RankedSearchResult<T> => Boolean(result))
    .sort((a, b) => a.score - b.score);
}

function rankProduct(
  product: SearchableProduct,
  query: string,
  queryTokens: string[]
): Pick<RankedSearchResult<SearchableProduct>, "score" | "matchType"> | null {
  const name = normalizeSearchText(product.name);
  const brand = normalizeSearchText(product.brand || "");
  const category = normalizeSearchText(product.category || "");
  const type = normalizeSearchText(product.type || "");
  const description = normalizeSearchText(product.description || "");
  const primaryFields = [name, brand, category, type].filter(Boolean);
  const searchableText = [...primaryFields, description].filter(Boolean).join(" ");
  const searchableTokens = getSearchTokens(searchableText);

  if (primaryFields.some((field) => field === query)) {
    return { score: 0, matchType: "exact" };
  }

  if (queryTokens.every((queryToken) => searchableTokens.some((token) => token === queryToken))) {
    return { score: 5, matchType: "exact" };
  }

  const prefixDistance = bestPrefixDistance(queryTokens, searchableTokens);
  if (prefixDistance !== null) {
    return { score: 100 + prefixDistance, matchType: "prefix" };
  }

  if (primaryFields.some((field) => field.includes(query))) {
    return { score: 220 + bestSubstringOffset(query, primaryFields), matchType: "substring" };
  }

  if (queryTokens.every((queryToken) => searchableTokens.some((token) => token.includes(queryToken)))) {
    return { score: 260, matchType: "substring" };
  }

  const fuzzyDistance = bestFuzzyDistance(queryTokens, searchableTokens);
  if (fuzzyDistance !== null) {
    return { score: 420 + fuzzyDistance, matchType: "fuzzy" };
  }

  if (searchableText.includes(queryTokens[0] || query)) {
    return { score: 700, matchType: "related" };
  }

  return null;
}

function bestPrefixDistance(queryTokens: string[], searchableTokens: string[]): number | null {
  let score = 0;

  for (const queryToken of queryTokens) {
    const tokenIndex = searchableTokens.findIndex((token) => token.startsWith(queryToken));
    if (tokenIndex === -1) return null;
    score += tokenIndex;
  }

  return score;
}

function bestSubstringOffset(query: string, fields: string[]): number {
  return fields.reduce((best, field) => {
    const offset = field.indexOf(query);
    return offset === -1 ? best : Math.min(best, offset);
  }, 999);
}

function bestFuzzyDistance(queryTokens: string[], searchableTokens: string[]): number | null {
  let totalDistance = 0;

  for (const queryToken of queryTokens) {
    const allowedDistance = getAllowedDistance(queryToken);
    const bestDistance = searchableTokens.reduce((best, token) => {
      if (Math.abs(token.length - queryToken.length) > allowedDistance + 2) {
        return best;
      }

      return Math.min(best, levenshteinDistance(queryToken, token));
    }, Number.POSITIVE_INFINITY);

    if (bestDistance > allowedDistance) return null;
    totalDistance += bestDistance;
  }

  return totalDistance;
}

function getAllowedDistance(token: string): number {
  if (token.length <= 3) return 1;
  if (token.length <= 6) return 2;
  return 3;
}

function levenshteinDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }

    for (let j = 0; j <= b.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
}
