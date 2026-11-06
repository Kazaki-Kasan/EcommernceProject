export interface Product {
    id: string;
    name: string;
    category: "audio" | "keyboards" | "gear" | "accessories";
    price: number;
    originalPrice?: number;
    rating: number;
    reviewsCount: number;
    badge?: string;
    description: string;
    specs: string[];
    inStock: boolean;
    color: string;
    iconType: "headphones" | "keyboard" | "speaker" | "mouse" | "camera" | "earbuds" | "mat" | "interface";
}

export interface CartItem {
    product: Product;
    quantity: number;
}

