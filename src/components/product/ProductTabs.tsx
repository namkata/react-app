'use client';

import { useState } from 'react';
import { Product } from '@/store/productStore';
import { ProductInfo } from './ProductInfo';

interface ProductTabsProps {
  product: Product;
}

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    date: '2024-01-15',
    comment: 'Excellent product! Great quality and fast delivery.',
    verified: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    date: '2024-01-10',
    comment: 'Good value for money. Would recommend to others.',
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 5,
    date: '2024-01-05',
    comment: 'Amazing taste and freshness. Will definitely buy again!',
    verified: false,
  },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'additional', label: 'Additional Info' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            </p>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>100% organic and natural ingredients</li>
              <li>Rich in essential nutrients and vitamins</li>
              <li>Sustainably sourced and eco-friendly packaging</li>
              <li>No artificial preservatives or additives</li>
              <li>Suitable for vegetarians and vegans</li>
            </ul>
          </div>
        )}

        {activeTab === 'additional' && (
          <ProductInfo product={product} />
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {product.rating} out of 5 ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Write a Review
                </button>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter(r => r.rating === rating).length;
                  const percentage = (count / reviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      👍 Helpful (12)
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}