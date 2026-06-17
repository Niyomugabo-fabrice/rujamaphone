"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { ProductCategory, ProductFilters } from "@/types/product";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  category?: ProductCategory;
  onApply: (filters: ProductFilters) => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  category,
  onApply,
}: FilterDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (
    key: keyof ProductFilters,
    value: string | number | undefined,
  ) => {
    const nextValue = value === "" ? undefined : value;

    if (key === "category") {
      onFiltersChange({
        category: nextValue as ProductCategory | undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
      return;
    }

    onFiltersChange({
      ...filters,
      [key]: nextValue,
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    onFiltersChange(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Category */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">Category</span>
              {expandedSections.category ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.category && (
              <div className="space-y-2 mt-2">
              {["SMARTPHONE", "SPEAKER", "ACCESSORY"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value as ProductCategory)
                    }
                    className="w-4 h-4 text-red-600"
                  />
                  <span className="capitalize">{cat.toLowerCase()}</span>
                </label>
              ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">Price Range</span>
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSections.price && (
              <div className="mt-4">
                <PriceRangeSlider
                  minPrice={filters.minPrice}
                  maxPrice={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t bg-gray-50">
          <button onClick={handleClearFilters} className="flex-1">
            Clear
          </button>
          <button onClick={handleApplyFilters} className="flex-1 bg-red-600 text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
