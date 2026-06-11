"use client";

import { X } from "lucide-react";
import type { ProductFilters } from "@/types/product";

interface FilterChipsProps {
  filters: ProductFilters;
  onFilterRemove: (key: keyof ProductFilters) => void;
  onClearAll: () => void;
}

export default function FilterChips({
  filters,
  onFilterRemove,
  onClearAll,
}: FilterChipsProps) {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "");

  if (activeFilters.length === 0) return null;

  const formatFilterLabel = (key: string, value: any): string => {
    const labelMap: Record<string, string> = {
      category: "Category",
      brand: "Brand",
      condition: "Condition",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      storage: "Storage",
      batteryLife: "Battery Life",
      type: "Type",
      search: "Search",
      sort: "Sort",
    };

    let displayValue = value;
    if (key === "minPrice" || key === "maxPrice") {
      displayValue = `${parseInt(value).toLocaleString()} RWF`;
    } else if (typeof value === "string") {
      displayValue = value.toLowerCase();
    }

    return `${labelMap[key] || key}: ${displayValue}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="text-sm text-gray-600">Active filters:</span>
      {activeFilters.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onFilterRemove(key as keyof ProductFilters)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors"
        >
          {formatFilterLabel(key, value)}
          <X className="w-3 h-3" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Clear all
      </button>
    </div>
  );
}
