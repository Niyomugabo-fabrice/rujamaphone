"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/product";
import { normalizeSearchText } from "@/lib/search";

type SearchResponse = {
  data?: Product[];
};

interface UseDebouncedSearchOptions {
  delay?: number;
  enabled?: boolean;
  limit?: number;
}

export function useDebouncedSearch({
  delay = 350,
  enabled = true,
  limit = 10,
}: UseDebouncedSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const normalizedQuery = useMemo(() => normalizeSearchText(query), [query]);

  useEffect(() => {
    abortRef.current?.abort();
    setError(null);

    if (!enabled || !normalizedQuery) {
      setIsLoading(false);
      setResults([]);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          search: normalizedQuery,
          limit: String(limit),
          suggestions: "1",
        });
        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = (await response.json()) as SearchResponse;
        setResults(data.data || []);
      } catch (searchError) {
        if ((searchError as DOMException).name === "AbortError") return;

        setResults([]);
        setError("Search is temporarily unavailable");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [delay, enabled, limit, normalizedQuery]);

  return {
    query,
    setQuery,
    normalizedQuery,
    results,
    isLoading,
    error,
  };
}
