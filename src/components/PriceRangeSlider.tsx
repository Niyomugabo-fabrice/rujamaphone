"use client";

import type { ProductFilters } from "@/types/product";

const MIN_PRICE = 0;
const MAX_PRICE = 2_500_000;
const PRICE_STEP = 10_000;

interface PriceRangeSliderProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
}

const formatCompactPrice = (price: number) =>
  new Intl.NumberFormat("en-RW", {
    maximumFractionDigits: 0,
  }).format(price);

export function PriceRangeSlider({ minPrice, maxPrice, onChange }: PriceRangeSliderProps) {
  const minValue = minPrice ?? MIN_PRICE;
  const maxValue = maxPrice ?? MAX_PRICE;
  const minPercent = ((minValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((maxValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  const clampMin = (value: number) =>
    Math.max(MIN_PRICE, Math.min(value, maxValue - PRICE_STEP));

  const clampMax = (value: number) =>
    Math.min(MAX_PRICE, Math.max(value, minValue + PRICE_STEP));

  const updateMin = (value: number) => {
    onChange("minPrice", clampMin(value) as ProductFilters["minPrice"]);
  };

  const updateMax = (value: number) => {
    onChange("maxPrice", clampMax(value) as ProductFilters["maxPrice"]);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -PRICE_STEP : PRICE_STEP;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const minDistance = Math.abs(pointerPercent - minPercent);
    const maxDistance = Math.abs(pointerPercent - maxPercent);

    if (minDistance <= maxDistance) {
      updateMin(minValue + direction);
    } else {
      updateMax(maxValue + direction);
    }
  };

  return (
    <div className="space-y-4" onWheel={handleWheel}>
      <div className="flex items-center justify-between gap-3 text-lg font-extrabold text-gray-950">
        <span>{formatCompactPrice(minValue)}</span>
        <span>{formatCompactPrice(maxValue)}</span>
      </div>

      <div className="relative h-9">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-red-600"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />

        <input
          aria-label="Minimum price"
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={PRICE_STEP}
          value={minValue}
          onChange={(event) => updateMin(Number(event.target.value))}
          className="price-range-thumb pointer-events-none absolute inset-x-0 top-1/2 z-20 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
        />
        <input
          aria-label="Maximum price"
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={PRICE_STEP}
          value={maxValue}
          onChange={(event) => updateMax(Number(event.target.value))}
          className="price-range-thumb pointer-events-none absolute inset-x-0 top-1/2 z-30 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
