"use client";

import React from "react";
import { Product } from "../types";
import ProductIcon from "../ProductIcon/ProductIcon";
import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({
    product,
    onQuickView,
    onAddToCart,
}: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-img-box">
                <div style={{ width: "120px", height: "120px" }}>
                    <ProductIcon type={product.iconType} />
                </div>

                {product.badge && (
                    <span className="product-badge">
                        {product.badge}
                    </span>
                )}

                <button
                    type="button"
                    className="product-quickview-btn"
                    onClick={() => onQuickView(product)}
                    aria-label={`Quick view ${product.name}`}
                >
                    Quick View
                </button>
            </div>

            <div className="product-info">
                <div>
                    <span className="product-category">
                        {product.category}
                    </span>
                    <h3 className="product-title">
                        {product.name}
                    </h3>
                </div>

                <div className="product-rating">
                    <span className="product-rating-score">Rating: {product.rating.toFixed(1)} / 5</span>
                    <span className="product-reviews-count">({product.reviewsCount})</span>
                </div>

                <div className="product-bottom-row">
                    <div>
                        <div className="product-price">
                            ${product.price.toFixed(2)}
                        </div>
                        {product.originalPrice && (
                            <div className="product-original-price">
                                ${product.originalPrice.toFixed(2)}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="product-add-btn"
                        onClick={() => onAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        + Add
                    </button>
                </div>
            </div>
        </article>
    );
}

