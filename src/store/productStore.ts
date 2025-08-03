import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  weight?: string;
  dimensions?: string;
  ingredients?: string[];
  storageInstructions?: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  search?: string;
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
  isLoading: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setFilters: (filters: ProductFilters) => void;
  setSortBy: (sortBy: ProductStore['sortBy']) => void;
  clearFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getRelatedProducts: (productId: string, limit?: number) => Product[];
  searchProducts: (query: string) => void;
  filterProducts: () => void;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Quinoa Brown Rice',
    price: 28.85,
    originalPrice: 32.85,
    image: '🌾',
    images: ['🌾', '🌾', '🌾'],
    category: 'grains',
    brand: 'Organic Valley',
    rating: 4.5,
    reviewCount: 128,
    description: 'Premium organic quinoa brown rice blend, perfect for healthy meals.',
    inStock: true,
    stockCount: 45,
    tags: ['organic', 'gluten-free', 'healthy'],
    nutritionalInfo: {
      calories: 220,
      protein: '8g',
      carbs: '45g',
      fat: '2g'
    },
    weight: '1 lb',
    ingredients: ['Organic Quinoa', 'Organic Brown Rice'],
    storageInstructions: 'Store in a cool, dry place'
  },
  {
    id: '2',
    name: 'Italian Chicken Meatballs',
    price: 31.80,
    image: '🍖',
    images: ['🍖', '🍖', '🍖'],
    category: 'meat',
    brand: 'Bella Vista',
    rating: 4.8,
    reviewCount: 89,
    description: 'Authentic Italian-style chicken meatballs made with premium ingredients.',
    inStock: true,
    stockCount: 23,
    tags: ['protein', 'italian', 'frozen'],
    nutritionalInfo: {
      calories: 180,
      protein: '22g',
      carbs: '5g',
      fat: '8g'
    },
    weight: '1.5 lbs',
    ingredients: ['Chicken', 'Breadcrumbs', 'Italian Herbs', 'Garlic'],
    storageInstructions: 'Keep frozen until ready to cook'
  },
  {
    id: '3',
    name: 'Blue Diamond Almonds',
    price: 23.85,
    image: '🥜',
    images: ['🥜', '🥜', '🥜'],
    category: 'snacks',
    brand: 'Blue Diamond',
    rating: 4.6,
    reviewCount: 156,
    description: 'Roasted and salted almonds, perfect for snacking.',
    inStock: true,
    stockCount: 67,
    tags: ['nuts', 'protein', 'snack'],
    nutritionalInfo: {
      calories: 160,
      protein: '6g',
      carbs: '6g',
      fat: '14g'
    },
    weight: '16 oz',
    ingredients: ['Almonds', 'Salt'],
    storageInstructions: 'Store in a cool, dry place'
  },
  {
    id: '4',
    name: 'Chobani Greek Yogurt',
    price: 54.85,
    image: '🥛',
    images: ['🥛', '🥛', '🥛'],
    category: 'dairy',
    brand: 'Chobani',
    rating: 4.7,
    reviewCount: 203,
    description: 'Creamy Greek yogurt packed with protein and probiotics.',
    inStock: true,
    stockCount: 34,
    tags: ['dairy', 'protein', 'probiotics'],
    nutritionalInfo: {
      calories: 100,
      protein: '17g',
      carbs: '6g',
      fat: '0g'
    },
    weight: '32 oz',
    ingredients: ['Cultured Pasteurized Nonfat Milk', 'Live Cultures'],
    storageInstructions: 'Refrigerate at 40°F or below'
  },
  {
    id: '5',
    name: 'Canada Dry Ginger Ale',
    price: 32.85,
    image: '🥤',
    images: ['🥤', '🥤', '🥤'],
    category: 'beverages',
    brand: 'Canada Dry',
    rating: 4.3,
    reviewCount: 78,
    description: 'Refreshing ginger ale with a crisp, clean taste.',
    inStock: true,
    stockCount: 89,
    tags: ['beverage', 'ginger', 'refreshing'],
    nutritionalInfo: {
      calories: 140,
      protein: '0g',
      carbs: '36g',
      fat: '0g'
    },
    weight: '12 fl oz (12 pack)',
    ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Natural Flavors'],
    storageInstructions: 'Store in a cool place'
  },
  {
    id: '6',
    name: 'Foster Farms Buffalo Wings',
    price: 17.85,
    image: '🍗',
    images: ['🍗', '🍗', '🍗'],
    category: 'meat',
    brand: 'Foster Farms',
    rating: 4.4,
    reviewCount: 92,
    description: 'Spicy buffalo wings ready to cook, perfect for game day.',
    inStock: false,
    stockCount: 0,
    tags: ['chicken', 'spicy', 'frozen'],
    nutritionalInfo: {
      calories: 190,
      protein: '19g',
      carbs: '1g',
      fat: '12g'
    },
    weight: '2 lbs',
    ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Spices'],
    storageInstructions: 'Keep frozen until ready to cook'
  }
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  filters: {},
  sortBy: 'name',
  isLoading: false,
  
  setProducts: (products) => {
    set({ products, filteredProducts: products });
  },
  
  setFilters: (filters) => {
    set({ filters });
    get().filterProducts();
  },
  
  setSortBy: (sortBy) => {
    set({ sortBy });
    get().filterProducts();
  },
  
  clearFilters: () => {
    set({ filters: {} });
    get().filterProducts();
  },
  
  getProductById: (id) => {
    return get().products.find(product => product.id === id);
  },
  
  getRelatedProducts: (productId, limit = 4) => {
    const { products } = get();
    const currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return [];
    
    return products
      .filter(p => p.id !== productId && p.category === currentProduct.category)
      .slice(0, limit);
  },
  
  searchProducts: (query) => {
    set({ filters: { ...get().filters, search: query } });
    get().filterProducts();
  },
  
  filterProducts: () => {
    const { products, filters, sortBy } = get();
    let filtered = [...products];
    
    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }
    
    if (filters.rating !== undefined) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }
    
    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => product.inStock === filters.inStock);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, reverse the array
        filtered.reverse();
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    set({ filteredProducts: filtered });
  },
}));