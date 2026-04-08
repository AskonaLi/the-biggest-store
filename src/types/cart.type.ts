export type CartItem = {
    id: number;
    title: string;
    price: number;
    images: string[];
    category: { name: string };
    quantity: number;
    description?: string;
  };