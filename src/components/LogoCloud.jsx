import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function LogoCloud({ logos }) {
  return (
    <div className="relative mx-auto max-w-3xl py-6">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">Our Sponsors</h2>
        <p className="text-sm text-muted-foreground">
          Proudly supported by our partners
        </p>
      </div>

      <InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-10 select-none object-contain"
            loading="lazy"
          />
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute left-0 top-0 h-full w-[160px]"
        direction="left"
      />

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute right-0 top-0 h-full w-[160px]"
        direction="right"
      />
    </div>
  );
}
