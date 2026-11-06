"use client";

import React from "react";
import ProductIcon from "../ProductIcon/ProductIcon";
import "./HeroSection.css";

interface HeroSectionProps {
    onShopNow: () => void;
    onViewDeals: () => void;
}

export default function HeroSection({ onShopNow, onViewDeals }: HeroSectionProps) {
    return (
        <section id="home" className="hero-section">
            <div className="hero-container">
                <div>

                    <h1 className="hero-title">
                        Engineered for Sound. <br />
                        <span className="hero-cyan-text">Crafted for Creators.</span>
                    </h1>

                    <p className="hero-description">
                        Experience pristine studio-grade acoustics, tactile mechanical keyboards, and precision streaming hardware tuned for relentless performance.
                    </p>

                    <div className="hero-actions">
                        <button type="button" className="hero-btn-primary" onClick={onShopNow}>
                            Shop All Products
                        </button>
                        <button type="button" className="hero-btn-accent" onClick={onViewDeals}>
                            Explore Deals (Up to 30% Off)
                        </button>
                    </div>
                </div>

                <div className="hero-card-wrapper">

                </div>
            </div>

            <div className="hero-benefits-ribbon">
                <div className="hero-benefit-item">
                    <div className="hero-benefit-title">Fast Express Delivery</div>
                    <div className="hero-benefit-desc">Free over $150 worldwide</div>
                </div>
                <div className="hero-benefit-item">
                    <div className="hero-benefit-title">2-Year Warranty</div>
                    <div className="hero-benefit-desc">Full coverage on studio gear</div>
                </div>
                <div className="hero-benefit-item">
                    <div className="hero-benefit-title">30-Day Money Back</div>
                    <div className="hero-benefit-desc">Hassle-free return policy</div>
                </div>
                <div className="hero-benefit-item">
                    <div className="hero-benefit-title">Pro Audio Support</div>
                    <div className="hero-benefit-desc">24/7 dedicated studio experts</div>
                </div>
            </div>
        </section>
    );
}

