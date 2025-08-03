'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <Link href={`/product/${item.id}`} className="flex-shrink-0">
          <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="text-3xl">{item.image}</span>
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <Link href={`/product/${item.id}`}>
                <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                In Stock
              </p>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ${item.price}
              </p>
              <p className="text-sm text-gray-500">
                ${(item.price * item.quantity).toFixed(2)} total
              </p>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleRemove}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}