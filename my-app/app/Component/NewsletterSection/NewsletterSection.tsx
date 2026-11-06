"use client";

import React, { useState } from "react";
import "./NewsletterSection.css";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && email.includes("@")) {
            setSubscribed(true);
        }
    };

    return (
        <section id="deals" className="newsletter-section">
            <div className="newsletter-card">
                <div>
                    <span className="newsletter-tag">
                        JOIN THE KDAS CREATOR GUILD
                    </span>
                    <h2 className="newsletter-title">
                        Unlock 15% Off Your Next Order
                    </h2>
                    <p className="newsletter-desc">
                        Get private access to limited-run studio gear drops, acoustic tuning presets, and exclusive creator hardware discounts.
                    </p>
                </div>

                <div>
                    {subscribed ? (
                        <div className="newsletter-success-box">
                            <div className="newsletter-success-title">
                                Welcome to Kdas Guild
                            </div>
                            <p className="newsletter-success-text">
                                Use your promo code at checkout:
                            </p>
                            <span className="newsletter-code-badge">
                                KDAS20
                            </span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <div className="newsletter-input-group">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your creator email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-submit-btn">
                                    Claim 15% Off
                                </button>
                            </div>
                            <span className="newsletter-note">
                                Zero spam. Unsubscribe anytime with a single click.
                            </span>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

