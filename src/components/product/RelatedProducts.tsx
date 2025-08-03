'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';

interface RelatedProductsProps {
  currentProductId: number;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { products } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

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

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Related Products
        </h2>
        <Link href="/shop">
          <Button variant="outline">
            View All Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-200 group"
          >
            <div className="relative p-4">
              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              
              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Product Image */}
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                  <span className="text-4xl">{product.image}</span>
                </div>
              </Link>

              {/* Category */}
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>

              {/* Product Name */}
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-xs">{renderStars(product.rating)}</div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-100 text-green-600 hover:bg-green-500 hover:text-white text-xs px-2 py-1"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}