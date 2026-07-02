import React from "react";

export function ProgressiveBlur({ className = "", direction = "left" }) {
  const gradient =
    direction === "left"
      ? "bg-gradient-to-r from-background to-transparent"
      : "bg-gradient-to-l from-background to-transparent";

  return <div className={`${gradient} ${className}`} />;
}
