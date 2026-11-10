export const demoCategories = [
  { _id: "cat-electronics", name: "Electronics", slug: "electronics", attributeSchema: ["brand", "condition"] },
  { _id: "cat-cars", name: "Cars", slug: "cars", attributeSchema: ["make", "model", "year", "mileage"] },
  { _id: "cat-wears", name: "Wears", slug: "wears", attributeSchema: ["type", "size", "color"] },
  { _id: "cat-perfume", name: "Perfume", slug: "perfume", attributeSchema: ["brand", "volume", "fragrance"] },
  { _id: "cat-foodstuff", name: "Foodstuff", slug: "foodstuff", attributeSchema: ["brand", "weight"] },
  { _id: "cat-provision", name: "Provision", slug: "provision", attributeSchema: ["brand", "unit"] },
  { _id: "cat-trucks", name: "Trucks", slug: "trucks", attributeSchema: ["make", "model", "year", "payload"] },
];

const categoryMap = demoCategories.reduce((acc, category) => {
  acc[category.slug] = category;
  acc[category._id] = category;
  return acc;
}, {});

export const demoProducts = [
  {
    _id: "prod-1",
    title: "2021 Toyota Corolla",
    description: "Reliable family sedan with excellent fuel economy and a clean interior.",
    price: 8500000,
    category: categoryMap["cat-cars"],
    attributes: { make: "Toyota", model: "Corolla", year: "2021", mileage: "18,000 km" },
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 2,
    memberName: "Daniel Okafor",
    memberContact: "daniel@example.com",
    status: "published",
    isFeatured: true,
  },
  {
    _id: "prod-2",
    title: "2023 Ford Ranger XL",
    description: "Strong pickup truck built for work and long-distance travel.",
    price: 19500000,
    category: categoryMap["cat-trucks"],
    attributes: { make: "Ford", model: "Ranger XL", year: "2023", payload: "1,200 kg" },
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c179362c0?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 1,
    memberName: "Chima Nwosu",
    memberContact: "chima@example.com",
    status: "published",
    isFeatured: true,
  },
  {
    _id: "prod-3",
    title: "Samsung 55-inch Smart TV",
    description: "Ultra HD smart display with crisp picture quality and Android streaming support.",
    price: 420000,
    category: categoryMap["cat-electronics"],
    attributes: { brand: "Samsung", condition: "New" },
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 5,
    memberName: "Joy Eze",
    memberContact: "joy@example.com",
    status: "published",
    isFeatured: true,
  },
  {
    _id: "prod-4",
    title: "Dell XPS 13 Laptop",
    description: "Lightweight premium laptop for work, study, and content creation.",
    price: 890000,
    category: categoryMap["cat-electronics"],
    attributes: { brand: "Dell", condition: "Used" },
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 3,
    memberName: "Mayowa Adebayo",
    memberContact: "mayowa@example.com",
    status: "published",
    isFeatured: false,
  },
  {
    _id: "prod-5",
    title: "Classic Cotton Shirt",
    description: "Smart casual shirt designed for daily comfort and style.",
    price: 8500,
    category: categoryMap["cat-wears"],
    attributes: { type: "Shirt", size: "L", color: "Navy" },
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 14,
    memberName: "Mariam Bello",
    memberContact: "mariam@example.com",
    status: "published",
    isFeatured: true,
  },
  {
    _id: "prod-6",
    title: "Luxury Rose Perfume 50ml",
    description: "Long-lasting feminine fragrance with a floral, sweet finish.",
    price: 16000,
    category: categoryMap["cat-perfume"],
    attributes: { brand: "Veloura", volume: "50ml", fragrance: "Rose" },
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 9,
    memberName: "Amara Ibe",
    memberContact: "amara@example.com",
    status: "published",
    isFeatured: false,
  },
  {
    _id: "prod-7",
    title: "Premium Rice 5kg",
    description: "Excellent quality long-grain rice for everyday family meals.",
    price: 6800,
    category: categoryMap["cat-foodstuff"],
    attributes: { brand: "Golden Harvest", weight: "5kg" },
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e7f9?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 25,
    memberName: "Rita Mba",
    memberContact: "rita@example.com",
    status: "published",
    isFeatured: true,
  },
  {
    _id: "prod-8",
    title: "Tomato Paste 24 Pack",
    description: "Bulk supply of rich tomato paste ideal for homes and small shops.",
    price: 9300,
    category: categoryMap["cat-provision"],
    attributes: { brand: "Farm Fresh", unit: "24 tins" },
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 18,
    memberName: "Yemi Dash",
    memberContact: "yemi@example.com",
    status: "published",
    isFeatured: false,
  },
  {
    _id: "prod-9",
    title: "Leather Sneakers",
    description: "Comfortable leather sneakers with a durable sole for everyday movement.",
    price: 18500,
    category: categoryMap["cat-wears"],
    attributes: { type: "Shoe", size: "42", color: "Brown" },
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"],
    stockQuantity: 11,
    memberName: "Kene Okoye",
    memberContact: "kene@example.com",
    status: "published",
    isFeatured: false,
  },
];

export const demoUsers = [
  { _id: "demo-admin", name: "Demo Admin", email: "admin@demo.com", password: "admin123", role: "admin" },
  { _id: "demo-member", name: "Demo Member", email: "member@demo.com", password: "member123", role: "member" },
];

export const filterDemoProducts = ({ keyword = "", category = "" } = {}) => {
  const term = keyword.trim().toLowerCase();
  return demoProducts.filter((product) => {
    const matchesKeyword =
      !term || product.title.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
    const matchesCategory =
      !category ||
      product.category?._id === category ||
      product.category?.slug === category ||
      product.category === category;
    return matchesKeyword && matchesCategory;
  });
};

export const getDemoProductById = (id) => demoProducts.find((product) => product._id === id) || null;
