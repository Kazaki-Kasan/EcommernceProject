import { CartItem, Product } from "../types";

export interface CartCalculation {
    subtotal: number;
    discount: number;
    isFreeShipping: boolean;
    shippingCost: number;
    finalTotal: number;
    progressPercent: number;
    totalCount: number;
}

export interface CouponResult {
    isValid: boolean;
    discountRate: number;
    message: string;
}

export function addToCart(cart: CartItem[], product: Product, quantity = 1): CartItem[] {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
        const updated = [...cart];
        updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
    }
    return [...cart, { product, quantity }];
}

export function updateCartQuantity(cart: CartItem[], productId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
        return removeFromCart(cart, productId);
    }
    return cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
    );
}

export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
    return cart.filter((item) => item.product.id !== productId);
}

export function calculateCartTotals(
    items: CartItem[],
    discountRate: number,
    freeShippingThreshold = 150
): CartCalculation {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = subtotal * discountRate;
    const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
    const shippingCost = isFreeShipping ? 0 : 15.0;
    const finalTotal = Math.max(0, subtotal - discount + shippingCost);
    const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        subtotal,
        discount,
        isFreeShipping,
        shippingCost,
        finalTotal,
        progressPercent,
        totalCount,
    };
}

export function validateCoupon(code: string): CouponResult {
    const normalized = code.trim().toUpperCase();
    if (normalized === "KDAS20") {
        return {
            isValid: true,
            discountRate: 0.2,
            message: "Coupon applied: 20% OFF!",
        };
    }
    if (normalized === "FREESHIP") {
        return {
            isValid: true,
            discountRate: 0.05,
            message: "Coupon applied: Extra $5 discount!",
        };
    }
    return {
        isValid: false,
        discountRate: 0,
        message: "Invalid code. Try 'KDAS20' for 20% off!",
    };
}

