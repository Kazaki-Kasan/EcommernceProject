import { Product } from "../types";

export interface FilterOptions {
    category?: string;
    searchTerm?: string;
    dealsOnly?: boolean;
    sortBy?: string;
}

export function filterAndSortProducts(products: Product[], options: FilterOptions): Product[] {
    const {
        category = "all",
        searchTerm = "",
        dealsOnly = false,
        sortBy = "featured",
    } = options;

    const trimmedQuery = searchTerm.trim().toLowerCase();

    return products
        .filter((product) => {
            if (category !== "all" && product.category !== category) {
                return false;
            }
            if (dealsOnly && !product.originalPrice) {
                return false;
            }
            if (trimmedQuery) {
                const matchesName = product.name.toLowerCase().includes(trimmedQuery);
                const matchesCategory = product.category.toLowerCase().includes(trimmedQuery);
                const matchesDesc = product.description.toLowerCase().includes(trimmedQuery);
                if (!matchesName && !matchesCategory && !matchesDesc) {
                    return false;
                }
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });
}

export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}

export function formatRating(rating: number): string {
    return `Rating: ${rating.toFixed(1)} / 5`;
}

