'use client';

import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Cake & Milk',
    count: 26,
    color: 'bg-red-100',
    icon: '🧁',
  },
  {
    id: 2,
    name: 'Organic Kiwi',
    count: 28,
    color: 'bg-green-100',
    icon: '🥝',
  },
  {
    id: 3,
    name: 'Peach',
    count: 14,
    color: 'bg-orange-100',
    icon: '🍑',
  },
  {
    id: 4,
    name: 'Red Apple',
    count: 54,
    color: 'bg-red-100',
    icon: '🍎',
  },
  {
    id: 5,
    name: 'Snack',
    count: 56,
    color: 'bg-yellow-100',
    icon: '🍿',
  },
  {
    id: 6,
    name: 'Vegetables',
    count: 72,
    color: 'bg-green-100',
    icon: '🥬',
  },
  {
    id: 7,
    name: 'Strawberry',
    count: 36,
    color: 'bg-pink-100',
    icon: '🍓',
  },
  {
    id: 8,
    name: 'Black plum',
    count: 123,
    color: 'bg-purple-100',
    icon: '🍇',
  },
  {
    id: 9,
    name: 'Custard apple',
    count: 34,
    color: 'bg-green-100',
    icon: '🍏',
  },
  {
    id: 10,
    name: 'Coffee & Tea',
    count: 89,
    color: 'bg-brown-100',
    icon: '☕',
  },
];

export function CategorySection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-gray-600">
            Choose your necessary products from our feature categories.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="text-center p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.count} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}