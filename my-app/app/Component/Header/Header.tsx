"use client";

import React from "react";
import "./Headerstylesheet.css";

interface HeaderProps {
    cartCount: number;
    onOpenCart: () => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function Header({
    cartCount,
    onOpenCart,
    searchTerm,
    onSearchChange,
}: HeaderProps) {
    return (
        <header className="HeadersProperty">
            <div className="ContainerLogo">
                <a href="#home" style={{ textDecoration: "none" }}>
                    <h1 className="Logo">Kdas</h1>
                </a>
                <span className="LogoTagline">Studio & Gear</span>
            </div>

            <nav className="Navigator" aria-label="Main navigation">
                <ul className="GapsRightMatters" role="list">
                    <li><a href="#home" className="NavLink">Home</a></li>
                    <li><a href="#products" className="NavLink">Products</a></li>
                    <li><a href="#deals" className="NavLink">Deals</a></li>
                    <li><a href="#about" className="NavLink">About</a></li>
                    <li><a href="#contact" className="NavLink">Contact</a></li>
                </ul>

                <div className="HeaderControls">
                    <div className="HeaderSearch">
                        <svg className="SearchIcon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="search"
                            className="HeaderSearchInput"
                            placeholder="Search gear..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            aria-label="Search gear"
                        />
                    </div>

                    <button
                        type="button"
                        className="CartButton"
                        onClick={onOpenCart}
                        aria-label={`Open shopping cart with ${cartCount} items`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="8" cy="21" r="1"/>
                            <circle cx="19" cy="21" r="1"/>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                        </svg>
                        <span>Cart</span>
                        <span className="CartBadge" aria-hidden="true">{cartCount}</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}

