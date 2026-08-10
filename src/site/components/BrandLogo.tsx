import * as React from "react";

type BrandLogoProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  variant?: "full" | "mark";
};

const BRAND_ASSETS = {
  full: {
    src: "/brand/matera-digital-logo.png",
    width: 910,
    height: 656,
  },
  mark: {
    src: "/brand/matera-digital-mark.png",
    width: 562,
    height: 407,
  },
} as const;

const BrandLogo = ({ variant = "full", alt = "Matera Digital", className = "", ...props }: BrandLogoProps) => {
  const asset = BRAND_ASSETS[variant];

  return (
    <img
      {...props}
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      className={`brand-logo brand-logo--${variant} ${className}`.trim()}
      decoding="async"
      draggable={false}
    />
  );
};

export default BrandLogo;
