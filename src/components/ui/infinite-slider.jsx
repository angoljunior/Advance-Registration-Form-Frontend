import React from "react";

export function InfiniteSlider({
  children,
  gap = 32,
  speed = 40,
  speedOnHover = 20,
  reverse = false,
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        "--gap": `${gap}px`,
        "--speed": `${speed}s`,
        "--speed-hover": `${speedOnHover}s`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="flex w-max animate-infinite-slider gap-[var(--gap)] hover:[animation-duration:var(--speed-hover)]">
        <div className="flex gap-[var(--gap)]">{children}</div>
        <div className="flex gap-[var(--gap)]">{children}</div>
      </div>
    </div>
  );
}
