'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export function CartSummary() {
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1); // 10% discount
      setAppliedCoupon(couponCode);
      setCouponCode('');
    } else if (couponCode.toLowerCase() === 'welcome20') {
      setDiscount(20); // $20 off
      setAppliedCoupon(couponCode);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Order Summary */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount ({appliedCoupon})</span>
              <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Coupon Code</h3>
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
            <div>
              <span className="text-sm font-medium text-green-800">{appliedCoupon}</span>
              <p className="text-xs text-green-600">Coupon applied successfully!</p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim()}
              size="sm"
              variant="outline"
            >
              Apply
            </Button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Try: SAVE10 (10% off) or WELCOME20 ($20 off)
        </p>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="font-medium text-gray-900">Free Shipping</span>
        </div>
        <p className="text-sm text-gray-600">
          {shipping === 0 ? (
            'Your order qualifies for free shipping!'
          ) : (
            `Add $${(100 - subtotal).toFixed(2)} more to get free shipping`
          )}
        </p>
      </div>

      {/* Checkout Button */}
      <div className="space-y-3">
        <Link href="/checkout">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3">
            Proceed to Checkout
          </Button>
        </Link>
        
        <div className="text-center">
          <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-800">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center pt-4 border-t">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure Checkout</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your payment information is protected
        </p>
      </div>
    </div>
  );
}