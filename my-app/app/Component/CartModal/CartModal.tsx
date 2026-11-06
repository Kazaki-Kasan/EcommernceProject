"use client";

import React, { useEffect, useRef, useState } from "react";
import { CartItem } from "../types";
import ProductIcon from "../ProductIcon/ProductIcon";
import { calculateCartTotals, validateCoupon, formatPrice } from "../utils";
import "./CartModal.css";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
    onClearCart: () => void;
}

export default function CartModal({
    isOpen,
    onClose,
    items,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
}: CartModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [couponCode, setCouponCode] = useState("");
    const [discountRate, setDiscountRate] = useState(0);
    const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [isOpen]);

    const handleClose = () => {
        setOrderPlaced(false);
        onClose();
    };

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        const result = validateCoupon(couponCode);
        setDiscountRate(result.discountRate);
        setCouponFeedback(result.message);
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderPlaced(true);
            onClearCart();
        }, 1000);
    };

    const totals = calculateCartTotals(items, discountRate);

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="cart-dialog-title"
            className="cart-dialog"
            onClose={handleClose}
        >
            <div className="cart-content">
                <div className="cart-header">
                    <div className="cart-header-left">
                        <h2 id="cart-dialog-title" className="cart-title">
                            Your Cart
                        </h2>
                        <span className="cart-count-badge">
                            {totals.totalCount} items
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cart-close-btn"
                        aria-label="Close cart"
                        autoFocus
                    >
                        X
                    </button>
                </div>

                <div className="shipping-bar-wrap">
                    <div className="shipping-bar-labels">
                        <span>
                            {totals.isFreeShipping
                                ? "Free Express Shipping unlocked"
                                : `Add ${formatPrice(150 - totals.subtotal)} more for free shipping`}
                        </span>
                        <span className="shipping-bar-percent">{Math.round(totals.progressPercent)}%</span>
                    </div>
                    <div className="shipping-bar-bg">
                        <div className="shipping-bar-fill" style={{ width: `${totals.progressPercent}%` }} />
                    </div>
                </div>

                {orderPlaced ? (
                    <div className="order-confirmed-view">
                        <div className="order-confirmed-icon">
                            OK
                        </div>
                        <h3 className="order-confirmed-title">Order Confirmed</h3>
                        <p className="order-confirmed-text">
                            Your order has been received and is being prepared for dispatch.
                        </p>
                        <button type="button" className="cart-checkout-btn" onClick={handleClose}>
                            Continue Shopping
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="empty-cart-view">
                        <div className="empty-cart-icon">
                            CART
                        </div>
                        <h3 className="empty-cart-title">Your cart is empty</h3>
                        <p className="empty-cart-text">
                            Explore our latest drops in pro audio and creator gear.
                        </p>
                        <button type="button" className="cart-checkout-btn" onClick={handleClose}>
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items-list">
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="cart-item-row">
                                    <div className="cart-item-thumb">
                                        <ProductIcon type={product.iconType} label="" />
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-name">
                                            {product.name}
                                        </div>
                                        <div className="cart-item-price">
                                            {formatPrice(product.price * quantity)}
                                        </div>
                                        <div className="cart-item-qty-row">
                                            <button
                                                type="button"
                                                onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                                                className="qty-btn"
                                                aria-label={`Decrease quantity of ${product.name}`}
                                            >
                                                -
                                            </button>
                                            <span className="qty-val">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                                                className="qty-btn"
                                                aria-label={`Increase quantity of ${product.name}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveItem(product.id)}
                                        className="cart-item-remove-btn"
                                        aria-label={`Remove ${product.name} from cart`}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                            <input
                                type="text"
                                placeholder="Promo code (try KDAS20)"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="cart-coupon-input"
                            />
                            <button type="submit" className="cart-coupon-btn">
                                Apply
                            </button>
                        </form>
                        {couponFeedback && (
                            <span
                                className="cart-coupon-feedback"
                                style={{ color: discountRate > 0 ? "var(--kdas-mint)" : "#e12885" }}
                            >
                                {couponFeedback}
                            </span>
                        )}

                        <div className="cart-summary">
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(totals.subtotal)}</span>
                            </div>
                            {totals.discount > 0 && (
                                <div className="cart-discount-row">
                                    <span>Discount</span>
                                    <span>-{formatPrice(totals.discount)}</span>
                                </div>
                            )}
                            <div className="cart-summary-row">
                                <span>Shipping</span>
                                <span>{totals.isFreeShipping ? "FREE" : formatPrice(totals.shippingCost)}</span>
                            </div>
                            <div className="cart-total-row">
                                <span>Total</span>
                                <span className="cart-total-amount">{formatPrice(totals.finalTotal)}</span>
                            </div>

                            <button
                                type="button"
                                className="cart-checkout-btn"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? "Processing..." : `Checkout - ${formatPrice(totals.finalTotal)}`}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </dialog>
    );
}
