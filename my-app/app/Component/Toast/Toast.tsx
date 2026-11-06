"use client";

import React from "react";
import "./Toast.css";

interface ToastProps {
    message: string | null;
    onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
    if (!message) return null;

    return (
        <div className="toast-container" role="status" aria-live="polite">
            <div className="kdas-toast">
                <span className="toast-text">{message}</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="toast-dismiss-btn"
                    aria-label="Dismiss message"
                >
                    X
                </button>
            </div>
        </div>
    );
}

