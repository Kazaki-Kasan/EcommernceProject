import React from "react";
import { Product } from "../types";
import "./ProductIcon.css";

interface PlaceholderProps {
    type?: Product["iconType"];
    label?: string;
    className?: string;
}

export default function ProductIcon({ label, className = "" }: PlaceholderProps) {
    const showText = label !== "";
    const text = label ?? "400 x 400";

    return (
        <div className={`placeholder-box ${className}`}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            {showText && <span className="placeholder-text">{text}</span>}
        </div>
    );
}

