"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { ProductCategory, ProductFilters } from "@/types/product";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  category?: ProductCategory;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  category,
}: FilterDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: true,
    condition: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key: keyof ProductFilters, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
    onClose();
  };

  const handleApplyFilters = () => {
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
          {/* Category Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">Category</span>
              {expandedSections.category ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
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
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="capitalize">{cat.toLowerCase()}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection("brand")}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">Brand</span>
              {expandedSections.brand ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.brand && (
              <div className="space-y-2 mt-2">
                {getBrandsForCategory(category).map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange("brand", e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Condition Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection("condition")}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">Condition</span>
              {expandedSections.condition ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.condition && (
              <div className="space-y-2 mt-2">
                {["NEW", "USED"].map((cond) => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      value={cond}
                      checked={filters.condition === cond}
                      onChange={(e) => handleFilterChange("condition", e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <span>{cond}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
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
              <div className="space-y-3 mt-2">
                <div>
                  <label className="text-sm text-gray-600">Min Price (RWF)</label>
                  <input
                    type="number"
                    value={filters.minPrice || ""}
                    onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Max Price (RWF)</label>
                  <input
                    type="number"
                    value={filters.maxPrice || ""}
                    onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                    placeholder="1000000"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category-specific filters */}
          {category === "SMARTPHONE" && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection("storage")}
                className="flex items-center justify-between w-full py-2"
              >
                <span className="font-medium">Storage</span>
                {expandedSections.storage ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.storage && (
                <div className="space-y-2 mt-2">
                  {["GB64", "GB128", "GB256", "GB512", "TB1"].map((storage) => (
                    <label key={storage} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="storage"
                        value={storage}
                        checked={filters.storage === storage}
                        onChange={(e) => handleFilterChange("storage", e.target.value)}
                        className="w-4 h-4 text-red-600"
                      />
                      <span>{storage}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {category === "SPEAKER" && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection("batteryLife")}
                className="flex items-center justify-between w-full py-2"
              >
                <span className="font-medium">Battery Life</span>
                {expandedSections.batteryLife ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.batteryLife && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={filters.batteryLife || ""}
                    onChange={(e) => handleFilterChange("batteryLife", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., 12 hours"
                  />
                </div>
              )}
            </div>
          )}

          {category === "ACCESSORY" && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection("type")}
                className="flex items-center justify-between w-full py-2"
              >
                <span className="font-medium">Type</span>
                {expandedSections.type ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.type && (
                <div className="space-y-2 mt-2">
                  {["Cable", "Case", "Charger", "Screen Protector", "Headphones", "Other"].map(
                    (type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={filters.type === type}
                          onChange={(e) => handleFilterChange("type", e.target.value)}
                          className="w-4 h-4 text-red-600"
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={handleClearFilters}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function getBrandsForCategory(category?: ProductCategory): string[] {
  switch (category) {
    case "SMARTPHONE":
      return ["APPLE", "SAMSUNG", "GOOGLE", "XIAOMI", "ONEPLUS"];
    case "SPEAKER":
      return ["JBL", "SONY", "BOSE", "APPLE", "ANKER"];
    case "ACCESSORY":
      return ["APPLE", "SAMSUNG", "ANKER", "BASEUS", "GENERIC"];
    default:
      return [
        "APPLE",
        "SAMSUNG",
        "GOOGLE",
        "XIAOMI",
        "ONEPLUS",
        "JBL",
        "SONY",
        "BOSE",
        "ANKER",
        "BASEUS",
        "GENERIC",
      ];
  }
}
