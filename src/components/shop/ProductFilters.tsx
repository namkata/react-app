'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ProductFilters as Filters } from '@/store/productStore';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: (query: string) => void;
}

const categories = [
  { id: 'all', name: 'All Categories', count: 1453 },
  { id: 'milks', name: 'Milks & Dairies', count: 165 },
  { id: 'coffees', name: 'Coffees & Teas', count: 207 },
  { id: 'pet', name: 'Pet Foods', count: 52 },
  { id: 'meats', name: 'Meats', count: 318 },
  { id: 'vegetables', name: 'Vegetables', count: 620 },
  { id: 'fruits', name: 'Fruits', count: 72 },
];

const brands = [
  { id: 'nestle', name: 'Nestle', count: 45 },
  { id: 'unilever', name: 'Unilever', count: 32 },
  { id: 'coca-cola', name: 'Coca Cola', count: 28 },
  { id: 'pepsi', name: 'Pepsi', count: 15 },
  { id: 'kraft', name: 'Kraft', count: 22 },
];

const colors = [
  { id: 'red', name: 'Red', color: 'bg-red-500' },
  { id: 'green', name: 'Green', color: 'bg-green-500' },
  { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
  { id: 'yellow', name: 'Yellow', color: 'bg-yellow-500' },
  { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
  { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
];

export function ProductFilters({ filters, onFilterChange, onSearch }: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 1000]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      ...filters,
      category: categoryId === 'all' ? undefined : categoryId,
    });
  };

  const handleBrandChange = (brandId: string) => {
    const newBrands = filters.brands?.includes(brandId)
      ? filters.brands.filter(b => b !== brandId)
      : [...(filters.brands || []), brandId];
    
    onFilterChange({
      ...filters,
      brands: newBrands,
    });
  };

  const handleColorChange = (colorId: string) => {
    const newColors = filters.colors?.includes(colorId)
      ? filters.colors.filter(c => c !== colorId)
      : [...(filters.colors || []), colorId];
    
    onFilterChange({
      ...filters,
      colors: newColors,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: undefined,
      brands: [],
      colors: [],
      minPrice: 0,
      maxPrice: 1000,
      rating: undefined,
    });
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Search Products</h3>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.id || (category.id === 'all' && !filters.category)}
                onChange={() => handleCategoryChange(category.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                filters.category === category.id || (category.id === 'all' && !filters.category)
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {(filters.category === category.id || (category.id === 'all' && !filters.category)) && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm text-gray-700 flex-1">{category.name}</span>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              min="0"
            />
          </div>
          <Button
            onClick={handlePriceChange}
            size="sm"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand.id) || false}
                onChange={() => handleBrandChange(brand.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                filters.brands?.includes(brand.id)
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {filters.brands?.includes(brand.id) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 flex-1">{brand.name}</span>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className={`w-8 h-8 rounded-full ${color.color} border-2 ${
                filters.colors?.includes(color.id)
                  ? 'border-gray-900'
                  : 'border-gray-300'
              }`}
              title={color.name}
            >
              {filters.colors?.includes(color.id) && (
                <svg className="w-4 h-4 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFilterChange({ ...filters, rating })}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                filters.rating === rating
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {filters.rating === rating && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex items-center">
                {Array.from({ length: rating }, (_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {Array.from({ length: 5 - rating }, (_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="ml-2 text-sm text-gray-600">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );
}