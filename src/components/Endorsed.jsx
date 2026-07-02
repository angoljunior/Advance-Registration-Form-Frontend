import React from "react";

export default function Endorsed({ logos }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-6 text-center">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Endorsed by</h2>
        <p className="text-sm text-muted-foreground">
          Officially endorsed by our institution
        </p>
      </div>

      <div className="flex items-center justify-center">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-20 select-none object-contain"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
