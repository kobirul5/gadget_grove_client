import type { ProductAttributes } from "@/components/home/data";

export type ProductFilterKey = keyof ProductAttributes | "price";

export type ProductFilter = {
  key: ProductFilterKey;
  label: string;
};

export type ProductCategory = {
  label: string;
  columns: string[][];
  matchTerms: string[];
  filters: ProductFilter[];
};

const priceFilter: ProductFilter = { key: "price", label: "Price Range" };
const availabilityFilter: ProductFilter = {
  key: "availability",
  label: "Availability",
};

export const productCategories: ProductCategory[] = [
  {
    label: "Apple",
    columns: [
      ["iPhone", "iPad", "MacBook", "MacBook Air", "Air M5 Series"],
      ["Air M4 Series", "Air M3 Series", "Air M2 Series", "MacBook Pro", "Pro M5 Series"],
      ["Pro M4 Series", "Pro M3 Series", "Pro M2 Series", "MacBook Cover", "Screen Protector"],
      ["Mac mini", "M4", "M2", "Power Adapter", "Universal Travel Adapter"],
      ["AirPods", "EarPods", "Apple Watch", "AirTag", "iMac"],
      ["M4 Series", "M3 Series", "M1 Series", "Mac Studio", "AirPods Max"],
    ],
    matchTerms: ["apple", "iphone", "ipad", "mac", "macbook", "mac mini", "airpods", "earpods", "airtag", "imac"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "storage", label: "Storage" },
      { key: "color", label: "Color" },
      availabilityFilter,
    ],
  },
  {
    label: "Tablet & Accessories",
    columns: [
      ["iPad", "Android Tablets", "Samsung Galaxy Tab", "Lenovo Tablets", "Kids Tablets"],
      ["Cases & Covers", "Screen Protectors", "Folio Cases", "Rugged Cases", "Keyboard Cases"],
      ["Keyboards", "Stylus Pens", "Bluetooth Keyboards", "Tablet Stands", "USB-C Hubs"],
    ],
    matchTerms: ["tablet", "ipad", "galaxy tab", "stylus", "folio case"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "brand", label: "Brand" },
      { key: "storage", label: "Storage" },
      availabilityFilter,
    ],
  },
  {
    label: "Phones",
    columns: [
      ["iPhone", "Samsung", "Xiaomi", "OnePlus", "Google Pixel"],
      ["OPPO", "vivo", "Realme", "Honor", "Nothing Phone"],
      ["Phone Accessories", "Cases & Covers", "Screen Protectors", "Chargers & Cables", "Power Banks"],
      ["Feature Phones", "Gaming Phones", "Refurbished Phones", "Wireless Chargers", "Phone Holders"],
    ],
    matchTerms: ["phone", "smartphone", "mobile", "iphone", "galaxy"],
    filters: [
      { key: "brand", label: "Brand" },
      priceFilter,
      { key: "ram", label: "RAM" },
      { key: "storage", label: "Storage" },
      { key: "screenSize", label: "Screen Size" },
      { key: "batteryCapacity", label: "Battery Capacity" },
      { key: "operatingSystem", label: "Operating System" },
      availabilityFilter,
    ],
  },
  {
    label: "Desktop",
    columns: [
      ["Desktop PCs", "All-in-One PCs", "Mini PCs", "Gaming Desktops", "Workstations"],
      ["Monitors", "Gaming Monitors", "4K Monitors", "Ultrawide Monitors", "Monitor Arms"],
      ["Keyboards & Mouse", "Webcams", "Speakers", "UPS & Power", "Desktop Components"],
    ],
    matchTerms: ["desktop", "computer", "pc", "monitor", "workstation"],
    filters: [
      { key: "brand", label: "Brand" },
      priceFilter,
      { key: "processor", label: "Processor" },
      { key: "ram", label: "RAM" },
      { key: "storage", label: "Storage" },
      { key: "graphicsCard", label: "Graphics Card" },
      availabilityFilter,
    ],
  },
  {
    label: "Laptops",
    columns: [
      ["MacBook", "Windows Laptops", "Chromebooks", "2-in-1 Laptops", "Business Laptops"],
      ["Gaming Laptops", "Creator Laptops", "Ultrabooks", "Student Laptops", "Workstation Laptops"],
      ["Laptop Bags", "Laptop Stands", "Cooling Pads", "Docks & Hubs", "Laptop Chargers"],
    ],
    matchTerms: ["laptop", "notebook", "chromebook", "macbook"],
    filters: [
      { key: "brand", label: "Brand" },
      priceFilter,
      { key: "processor", label: "Processor" },
      { key: "ram", label: "RAM" },
      { key: "storage", label: "Storage" },
      { key: "graphicsCard", label: "Graphics Card" },
      { key: "screenSize", label: "Screen Size" },
      { key: "operatingSystem", label: "Operating System" },
    ],
  },
  {
    label: "Gadgets & Accessories",
    columns: [
      ["Headphones", "Earbuds", "Smartwatches", "Fitness Bands", "Speakers"],
      ["Power Banks", "Wall Chargers", "Wireless Chargers", "Charging Docks", "Chargers & Cables"],
      ["Smart Home", "Smart Plugs", "Smart Lights", "Security Devices", "Voice Assistants"],
      ["Gaming Accessories", "Memory Cards", "USB Hubs", "Adapters", "Car Accessories"],
    ],
    matchTerms: ["headphone", "earbud", "watch", "wearable", "charger", "power bank", "power station", "smart home", "speaker", "gaming", "controller", "audio"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "brand", label: "Brand" },
      { key: "color", label: "Color" },
      availabilityFilter,
    ],
  },
  {
    label: "Appliances",
    columns: [
      ["Air Conditioners", "Refrigerators", "Freezers", "Water Dispensers", "Dehumidifiers"],
      ["Washing Machines", "Dryers", "Air Purifiers", "Vacuum Cleaners", "Fans"],
      ["Kitchen Appliances", "Microwaves", "Coffee Makers", " blenders", "Electric Kettles"],
      ["Rice Cookers", "Air Fryers", "Toasters", "Water Heaters", "Home Accessories"],
    ],
    matchTerms: ["appliance", "air purifier", "refrigerator", "freezer", "washing machine", "microwave", "coffee maker", "kettle", "air conditioner"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "brand", label: "Brand" },
      availabilityFilter,
    ],
  },
  {
    label: "Lifestyle",
    columns: [
      ["Wearables", "Gaming", "Fitness Trackers", "Sports Watches", "Health Monitors"],
      ["Travel", "Travel Adapters", "Luggage Trackers", "Portable Speakers", "Car Gadgets"],
      ["Smart Home", "Personal Care", "Electric Toothbrushes", "Hair Care", "Lifestyle Accessories"],
    ],
    matchTerms: ["wearable", "fitness", "travel", "smart home", "personal care", "health monitor", "sports watch"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "brand", label: "Brand" },
      availabilityFilter,
    ],
  },
  {
    label: "Camera & Networking",
    columns: [
      ["Digital Cameras", "Action Cameras", "Mirrorless Cameras", "DSLR Cameras", "Instant Cameras"],
      ["Wi-Fi Routers", "Mesh Wi-Fi", "Range Extenders", "Network Switches", "Modems"],
      ["CCTV Cameras", "IP Cameras", "Video Doorbells", "Security Systems", "Camera Accessories"],
    ],
    matchTerms: ["camera", "router", "wi-fi", "network", "cctv", "security system", "modem"],
    filters: [
      { key: "productType", label: "Product Type" },
      priceFilter,
      { key: "brand", label: "Brand" },
      availabilityFilter,
    ],
  },
];

export function getProductCategory(label: string | null) {
  return productCategories.find((category) => category.label === label);
}

export function getParentProductCategory(label: string) {
  const normalizedLabel = label.trim().toLowerCase();
  return productCategories.find((category) => {
    const matchesSubcategory = category.columns.some((column) =>
      column.some((option) => option.toLowerCase() === normalizedLabel),
    );
    const matchesTerm = category.matchTerms.some(
      (term) => normalizedLabel.includes(term) || term.includes(normalizedLabel),
    );
    return matchesSubcategory || matchesTerm;
  });
}
