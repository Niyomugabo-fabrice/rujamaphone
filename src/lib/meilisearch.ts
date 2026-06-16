// // lib/meilisearch.ts

// import { MeiliSearch } from "meilisearch";

// export const meiliClient = new MeiliSearch({
//   host: process.env.MEILISEARCH_HOST!,
//   apiKey: process.env.MEILISEARCH_API_KEY,
// });

// export const productsIndex = meiliClient.index("products");

// export async function searchProducts(
//   query: string,
//   filters?: string[],
//   limit = 20
// ) {
//   return productsIndex.search(query, {
//     filter: filters,
//     limit,
//   });
// }