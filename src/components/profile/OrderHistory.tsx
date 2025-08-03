'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const orders = [
  {
    id: 'NF0014',
    date: '2024-01-20',
    status: 'delivered',
    total: 89.50,
    items: [
      { name: 'Organic Quinoa Brown Rice', quantity: 2, price: 28.85, image: '🌾' },
      { name: 'Italian Chicken Meatballs', quantity: 1, price: 31.80, image: '🍖' },
    ],
  },
  {
    id: 'NF0013',
    date: '2024-01-15',
    status: 'shipped',
    total: 156.75,
    items: [
      { name: 'Blue Diamond Almonds', quantity: 3, price: 23.85, image: '🥜' },
      { name: 'Chobani Greek Yogurt', quantity: 2, price: 54.85, image: '🥛' },
    ],
  },
  {
    id: 'NF0012',
    date: '2024-01-10',
    status: 'processing',
    total: 67.20,
    items: [
      { name: 'Canada Dry Ginger Ale', quantity: 2, price: 32.85, image: '🥤' },
    ],
  },
  {
    id: 'NF0011',
    date: '2024-01-05',
    status: 'cancelled',
    total: 45.30,
    items: [
      { name: 'Foster Farms Buffalo Wings', quantity: 1, price: 17.85, image: '🍗' },
      { name: 'Kettle Corn Snack', quantity: 1, price: 27.45, image: '🍿' },
    ],
  },
];

const statusConfig = {
  processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

export function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Order History
          </h2>
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${filter} orders found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg">
                {/* Order Header */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        statusConfig[order.status as keyof typeof statusConfig].color
                      }`}>
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                {selectedOrder === order.id && (
                  <div className="p-4">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{item.image}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ${item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200">
                      {order.status === 'delivered' && (
                        <>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                          <Button size="sm" variant="outline">
                            Leave Review
                          </Button>
                          <Button size="sm" variant="outline">
                            Download Invoice
                          </Button>
                        </>
                      )}
                      {order.status === 'shipped' && (
                        <Button size="sm" variant="outline">
                          Track Package
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button size="sm" variant="outline">
                          Cancel Order
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}