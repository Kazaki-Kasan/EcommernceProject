"use client";

import React from "react";
import "./CategoryFilter.css";

interface CategoryFilterProps {
    activeCategory: string;
    onSelectCategory: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    dealsOnly: boolean;
    onToggleDealsOnly: () => void;
    resultsCount: number;
}

const CATEGORIES = [
    { id: "all", label: "All Gear" },
    { id: "audio", label: "Audio & Monitors" },
    { id: "keyboards", label: "Mechanical Keyboards" },
    { id: "gear", label: "Studio & Streaming" },
    { id: "accessories", label: "Accessories" },
];

export default function CategoryFilter({
    activeCategory,
    onSelectCategory,
    sortBy,
    onSortChange,
    dealsOnly,
    onToggleDealsOnly,
    resultsCount,
}: CategoryFilterProps) {
    return (
        <div className="category-filter-wrap">
            <div className="category-filter-top">
                <div className="category-tabs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`filter-tab ${activeCategory === cat.id ? "active" : ""}`}
                            onClick={() => onSelectCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="category-controls">
                    <label className="deals-toggle-label">
                        <input
                            type="checkbox"
                            className="deals-checkbox"
                            checked={dealsOnly}
                            onChange={onToggleDealsOnly}
                        />
                        <span>Deals Only</span>
                    </label>

                    <div className="sort-group">
                        <span className="sort-label">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="sort-select"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="results-count">
                Showing <strong className="results-count-bold">{resultsCount}</strong> gear items
            </div>
        </div>
    );
}

