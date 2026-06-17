"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { getProductUrl } from "@/lib/product-url";

interface Suggestion {
  id: string;
  slug?: string;
  title: string;
  brand?: string | null;
  image?: string | null;
}

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_DELAY = 250;
const MAX_SUGGESTIONS = 5;

export default function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  const fetchSuggestions = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/autocomplete?q=${encodeURIComponent(searchTerm)}&limit=${MAX_SUGGESTIONS}`
      );
      const payload = await response.json();

      if (payload.success) {
        setSuggestions(payload.suggestions ?? []);
        setIsOpen(payload.suggestions?.length > 0);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Autocomplete request failed", error);
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scheduleFetch = useCallback(
    (searchTerm: string) => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }

      debounceRef.current = window.setTimeout(() => {
        void fetchSuggestions(searchTerm);
      }, DEBOUNCE_DELAY);
    },
    [fetchSuggestions]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    scheduleFetch(nextQuery);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current < suggestions.length - 1 ? current + 1 : 0));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current > 0 ? current - 1 : suggestions.length - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        window.location.href = getProductUrl(suggestions[selectedIndex].slug ?? suggestions[selectedIndex].id);
      }
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= MIN_QUERY_LENGTH && suggestions.length > 0 && setIsOpen(true)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-[#D90429] focus:ring-2 focus:ring-[#D90429]/20"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 transition hover:text-slate-700"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {isLoading && (
          <div className="absolute inset-y-0 right-10 flex items-center pr-3">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <Link
              key={suggestion.id}
              href={getProductUrl(suggestion.slug ?? suggestion.id)}
              className={`flex items-center gap-3 px-3 py-3 transition ${
                index === selectedIndex ? "bg-slate-100" : "hover:bg-slate-50"
              }`}
              onClick={() => {
                setIsOpen(false);
                setQuery(suggestion.title);
              }}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={suggestion.image || "/placeholder.jpg"}
                  alt={suggestion.title}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    (event.target as HTMLImageElement).src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{suggestion.title}</p>
                <p className="truncate text-xs text-slate-500">{suggestion.brand || "Product"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && !isLoading && query.length >= MIN_QUERY_LENGTH && suggestions.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm text-slate-500 shadow-xl"
        >
          No suggestions found
        </div>
      )}
    </div>
  );
}
