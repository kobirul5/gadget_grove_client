import {
  BatteryCharging,
  Camera,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  image: string;
  label?: string;
};

export type Category = {
  name: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { name: "iPhone", icon: Smartphone },
  { name: "Tablet", icon: Smartphone },
  { name: "Mac", icon: Laptop },
  { name: "Laptop", icon: Laptop },
  { name: "Smart Watch", icon: Watch },
  { name: "Audio", icon: Headphones },
  { name: "Power Station", icon: BatteryCharging },
  { name: "Camera", icon: Camera },
];

export const newTrends: Product[] = [
  {
    name: "Wireless Game Controller",
    category: "Gaming",
    price: "৳ 8,490",
    oldPrice: "৳ 9,900",
    image:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=700&q=85",
    label: "New",
  },
  {
    name: "Air Purifier Mini",
    category: "Home tech",
    price: "৳ 12,500",
    oldPrice: "৳ 14,000",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=700&q=85",
    label: "New",
  },
  {
    name: "Galaxy S Series",
    category: "Smartphone",
    price: "৳ 89,900",
    oldPrice: "৳ 96,500",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",
    label: "Just in",
  },
  {
    name: "Studio Wireless Headphones",
    category: "Audio",
    price: "৳ 18,900",
    oldPrice: "৳ 21,000",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    label: "New",
  },
  {
    name: "Classic Smart Watch",
    category: "Wearables",
    price: "৳ 14,500",
    oldPrice: "৳ 16,000",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
  },
];

export const featuredProducts: Product[] = [
  newTrends[0],
  newTrends[3],
  newTrends[1],
  {
    name: "Everyday Ultrabook",
    category: "Computers",
    price: "৳ 112,000",
    oldPrice: "৳ 124,000",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",
  },
];

export const saleProducts: Product[] = [
  featuredProducts[0],
  featuredProducts[2],
  newTrends[2],
  featuredProducts[1],
];

export const trendingProducts: Product[] = [
  {
    name: "Galaxy S Series Ultra",
    category: "Samsung",
    price: "৳ 89,900",
    oldPrice: "৳ 96,500",
    image: newTrends[2].image,
  },
  newTrends[3],
  {
    name: "Pocket Camera Pro",
    category: "Photography",
    price: "৳ 64,900",
    oldPrice: "৳ 72,000",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=85",
  },
  featuredProducts[3],
];

export const brandProducts: Product[] = [
  {
    name: "Wireless Game Controller",
    category: "Gaming devices",
    price: "৳ 8,490",
    oldPrice: "৳ 9,900",
    image:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=85",
    label: "Popular",
  },
  {
    name: "Air Purifier Mini",
    category: "Home electronics",
    price: "৳ 12,500",
    oldPrice: "৳ 14,000",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=85",
    label: "Top pick",
  },
  {
    name: "Galaxy S Series",
    category: "Smartphones",
    price: "৳ 89,900",
    oldPrice: "৳ 96,500",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85",
    label: "Featured",
  },
];

export const brands = [
  "All",
  "Apple",
  "Samsung",
  "Xiaomi",
  "JBL",
  "Anker",
  "Nothing",
  "Sony",
  "OnePlus",
];
