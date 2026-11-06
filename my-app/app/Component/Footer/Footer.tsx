"use client";

import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer id="contact" className="footer-root">
            <div className="footer-container">
                <div>
                    <div className="footer-brand-header">
                        <span className="footer-logo-badge">
                            Kdas
                        </span>
                        <span className="footer-logo-tagline">
                            Studio & Gear
                        </span>
                    </div>
                    <p className="footer-brand-desc">
                        Empowering audio engineers, mechanical keyboard enthusiasts, and digital creators worldwide with high-fidelity studio instruments.
                    </p>
                    <div className="footer-hq-text">
                        Headquarters: Tokyo | San Francisco | Berlin
                    </div>
                </div>

                <div>
                    <h3 className="footer-col-title">
                        Shop Gear
                    </h3>
                    <ul className="footer-links-list">
                        <li><a href="#products" className="footer-link-item">Pro ANC Headphones</a></li>
                        <li><a href="#products" className="footer-link-item">Mechanical Keyboards</a></li>
                        <li><a href="#products" className="footer-link-item">Studio Reference Monitors</a></li>
                        <li><a href="#products" className="footer-link-item">Ultra-Light Gaming Mice</a></li>
                        <li><a href="#deals" className="footer-link-pink">Limited Drops & Deals</a></li>
                    </ul>
                </div>

                <div id="about">
                    <h3 className="footer-col-title">
                        Support & Info
                    </h3>
                    <ul className="footer-links-list">
                        <li><span className="footer-info-item">Order Tracking & Delivery</span></li>
                        <li><span className="footer-info-item">2-Year Hardware Warranty</span></li>
                        <li><span className="footer-info-item">Acoustic Drivers & Firmware</span></li>
                        <li><span className="footer-info-item">Return & Refund Portal</span></li>
                        <li><span className="footer-info-item">support@kdas-studio.io</span></li>
                    </ul>
                </div>

                <div>
                    <h3 className="footer-col-title">
                        Secure Checkout
                    </h3>
                    <p className="footer-trust-desc">
                        Encrypted with 256-bit bank-grade TLS. Verified by Stripe and Apple Pay.
                    </p>
                    <div className="footer-payment-badges">
                        <span className="footer-payment-pill">VISA</span>
                        <span className="footer-payment-pill">Mastercard</span>
                        <span className="footer-payment-pill">Apple Pay</span>
                        <span className="footer-payment-pill">Google Pay</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <div>Copyright 2026 Kdas Studio Audio & Peripherals Inc. All rights reserved.</div>
                <div className="footer-legal-links">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Security</span>
                </div>
            </div>
        </footer>
    );
}

