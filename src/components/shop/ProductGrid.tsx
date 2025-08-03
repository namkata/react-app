'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/store/productStore';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
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

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Product Image */}
              <Link href={`/product/${product.id}`} className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-4xl">{product.image}</span>
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 mb-2 hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ${product.price}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-200 group"
        >
          <div className="relative p-6">
            {/* Discount Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            )}
            
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            
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
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
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
  );
}