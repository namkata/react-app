'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

const products = [
  {
    id: 1,
    name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
    price: 28.85,
    originalPrice: 32.8,
    rating: 4.0,
    reviews: 4,
    image: '🌾',
    category: 'Hodo Foods',
    inStock: true,
  },
  {
    id: 2,
    name: 'All Natural Italian-Style Chicken Meatballs',
    price: 52.85,
    originalPrice: 55.8,
    rating: 3.5,
    reviews: 4,
    image: '🍖',
    category: 'Stouffer',
    inStock: true,
  },
  {
    id: 3,
    name: 'Angie\'s Boomchickapop Sweet & Salty Kettle Corn',
    price: 48.85,
    originalPrice: 52.8,
    rating: 4.0,
    reviews: 4,
    image: '🍿',
    category: 'Chapman\'s',
    inStock: true,
  },
  {
    id: 4,
    name: 'Foster Farms Takeout Crispy Classic Buffalo Wings',
    price: 17.85,
    originalPrice: 19.8,
    rating: 4.0,
    reviews: 4,
    image: '🍗',
    category: 'Tyson',
    inStock: true,
  },
  {
    id: 5,
    name: 'Blue Diamond Almonds Lightly Salted Vegetables',
    price: 23.85,
    originalPrice: 25.8,
    rating: 4.0,
    reviews: 4,
    image: '🥜',
    category: 'NestFood',
    inStock: true,
  },
  {
    id: 6,
    name: 'Chobani Complete Vanilla Greek Yogurt',
    price: 54.85,
    originalPrice: 55.8,
    rating: 4.0,
    reviews: 4,
    image: '🥛',
    category: 'Chobani',
    inStock: true,
  },
  {
    id: 7,
    name: 'Canada Dry Ginger Ale – 2 L Bottle - Canada Dry',
    price: 32.85,
    originalPrice: 33.8,
    rating: 4.0,
    reviews: 4,
    image: '🥤',
    category: 'Coca Cola',
    inStock: true,
  },
  {
    id: 8,
    name: 'Encore Seafoods Stuffed Alaskan Salmon',
    price: 35.85,
    originalPrice: 37.8,
    rating: 4.0,
    reviews: 4,
    image: '🐟',
    category: 'NestFood',
    inStock: true,
  },
];

const tabs = [
  { id: 'all', label: 'All', count: 1453 },
  { id: 'milks', label: 'Milks & Dairies', count: 165 },
  { id: 'coffees', label: 'Coffees & Teas', count: 207 },
  { id: 'pet', label: 'Pet Foods', count: 52 },
  { id: 'meats', label: 'Meats', count: 318 },
  { id: 'vegetables', label: 'Vegetables', count: 620 },
  { id: 'fruits', label: 'Fruits', count: 72 },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Products
          </h2>
          <p className="text-gray-600">
            Do not miss the current offers until the end of March.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="relative p-6">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
                
                {/* Product Image */}
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                </Link>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                {/* Product Name */}
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-100 text-green-600 hover:bg-green-500 hover:text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" className="px-8">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}