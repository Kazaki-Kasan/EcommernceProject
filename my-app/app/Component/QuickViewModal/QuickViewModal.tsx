"use client";

import React, { useEffect, useRef, useState } from "react";
import { Product } from "../types";
import ProductIcon from "../ProductIcon/ProductIcon";
import "./QuickViewModal.css";

interface QuickViewModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export default function QuickViewModal({
    product,
    onClose,
    onAddToCart,
}: QuickViewModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (product) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [product]);

    if (!product) return null;

    const handleClose = () => {
        setQuantity(1);
        onClose();
    };

    const handleAdd = () => {
        onAddToCart(product, quantity);
        handleClose();
    };

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="quickview-title"
            className="quickview-dialog"
            onClose={handleClose}
        >
            <div className="quickview-content">
                <button
                    type="button"
                    onClick={handleClose}
                    className="quickview-close-btn"
                    aria-label="Close product preview"
                    autoFocus
                >
                    X
                </button>

                <div className="quickview-grid">
                    <div className="quickview-img-box">
                        <div className="quickview-img-inner">
                            <ProductIcon type={product.iconType} label="600 x 600" />
                        </div>
                        {product.badge && (
                            <span className="quickview-badge">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="quickview-category">
                            {product.category}
                        </div>
                        <h2 id="quickview-title" className="quickview-title">
                            {product.name}
                        </h2>

                        <div className="quickview-meta-row">
                            <span className="quickview-rating">Rating: {product.rating.toFixed(1)} / 5</span>
                            <span className="quickview-reviews">({product.reviewsCount} reviews)</span>
                            <span className="quickview-stock">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="quickview-price-row">
                            <span className="quickview-price">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="quickview-original-price">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="quickview-desc">
                            {product.description}
                        </p>

                        <div className="quickview-specs-box">
                            <div className="quickview-specs-title">
                                Key Specifications:
                            </div>
                            <ul className="quickview-specs-list">
                                {product.specs.map((spec, i) => (
                                    <li key={i}>{spec}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="quickview-actions">
                            <div className="quickview-qty-group">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="quickview-qty-btn"
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="quickview-qty-val">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="quickview-qty-btn"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                className="quickview-add-btn"
                                onClick={handleAdd}
                            >
                                Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

