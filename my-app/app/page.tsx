"use client";

import React, { useState, useMemo } from "react";
import "./page.css";
import {
    Header,
    HeroSection,
    CategoryFilter,
    ProductCard,
    CartModal,
    QuickViewModal,
    NewsletterSection,
    Footer,
    Toast,
    PRODUCTS,
    Product,
    CartItem,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    filterAndSortProducts,
} from "./Component";

export default function Home() {
    const [cart, setCart] = useState<CartItem[]>([
        { product: PRODUCTS[0], quantity: 1 },
    ]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [dealsOnly, setDealsOnly] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage((prev) => (prev === msg ? null : prev));
        }, 3000);
    };

    const handleAddToCart = (product: Product, quantity = 1) => {
        setCart((prev) => addToCart(prev, product, quantity));
        showToast(`Added ${quantity > 1 ? `${quantity}x ` : ""}${product.name} to cart`);
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        setCart((prev) => updateCartQuantity(prev, productId, quantity));
    };

    const handleRemoveItem = (productId: string) => {
        setCart((prev) => removeFromCart(prev, productId));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const filteredProducts = useMemo(() => {
        return filterAndSortProducts(PRODUCTS, {
            category: activeCategory,
            dealsOnly,
            searchTerm,
            sortBy,
        });
    }, [activeCategory, dealsOnly, searchTerm, sortBy]);

    const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const scrollToProducts = () => {
        const el = document.getElementById("products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleViewDeals = () => {
        setDealsOnly(true);
        scrollToProducts();
    };

    return (
        <div className="store-page-root">
            <Header
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <HeroSection
                onShopNow={scrollToProducts}
                onViewDeals={handleViewDeals}
            />

            <main id="products" className="catalog-main">
                <div className="catalog-header">
                    <span className="catalog-tag">
                        OFFICIAL COLLECTION
                    </span>
                    <h2 className="catalog-heading">
                        Kdas Studio Gear Catalog
                    </h2>
                    <p className="catalog-subtitle">
                        Precision engineered acoustics, custom key switches, and high-performance streaming peripherals.
                    </p>
                </div>

                <CategoryFilter
                    activeCategory={activeCategory}
                    onSelectCategory={(cat) => {
                        setActiveCategory(cat);
                        setDealsOnly(false);
                    }}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    dealsOnly={dealsOnly}
                    onToggleDealsOnly={() => setDealsOnly((prev) => !prev)}
                    resultsCount={filteredProducts.length}
                />

                {filteredProducts.length === 0 ? (
                    <div className="empty-search-box">
                        <h3 className="empty-search-title">No products found</h3>
                        <p className="empty-search-desc">
                            We couldn&apos;t find any gear matching &quot;{searchTerm}&quot;. Try resetting your filters.
                        </p>
                        <button
                            type="button"
                            className="empty-search-reset-btn"
                            onClick={() => {
                                setSearchTerm("");
                                setActiveCategory("all");
                                setDealsOnly(false);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuickView={(prod) => setQuickViewProduct(prod)}
                                onAddToCart={(prod) => handleAddToCart(prod, 1)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <NewsletterSection />

            <Footer />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
            />

            <QuickViewModal
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
            />

            <Toast
                message={toastMessage}
                onClose={() => setToastMessage(null)}
            />
        </div>
    );
}
