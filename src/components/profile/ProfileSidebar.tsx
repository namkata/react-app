'use client';

import { useAuthStore } from '@/store/authStore';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    id: 'orders',
    label: 'Order History',
    icon: '📦',
  },
  {
    id: 'addresses',
    label: 'Address Book',
    icon: '📍',
  },
  {
    id: 'settings',
    label: 'Account Settings',
    icon: '⚙️',
  },
];

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const { user, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
              Premium Member
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === item.id
                ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}