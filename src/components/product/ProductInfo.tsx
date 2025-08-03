'use client';

import { Product } from '@/store/productStore';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Product Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">SKU:</span>
            <span className="font-medium">FWM{product.id.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Brand:</span>
            <span className="font-medium">NestFood</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Weight:</span>
            <span className="font-medium">1.2 kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dimensions:</span>
            <span className="font-medium">15 × 10 × 8 cm</span>
          </div>
        </div>
      </div>

      {/* Nutritional Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutritional Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Calories:</span>
              <span className="font-medium">150 per serving</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Protein:</span>
              <span className="font-medium">8g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Carbs:</span>
              <span className="font-medium">25g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fat:</span>
              <span className="font-medium">3g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fiber:</span>
              <span className="font-medium">5g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sugar:</span>
              <span className="font-medium">2g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Instructions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Instructions</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Store in a cool, dry place</p>
          <p>• Keep away from direct sunlight</p>
          <p>• Refrigerate after opening</p>
          <p>• Best consumed within 3 days of opening</p>
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
        <p className="text-sm text-gray-600">
          Organic quinoa, brown rice, red rice, natural flavoring, sea salt, 
          organic herbs and spices. Contains no artificial preservatives, 
          colors, or flavors.
        </p>
      </div>
    </div>
  );
}