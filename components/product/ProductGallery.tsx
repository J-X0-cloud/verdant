import clsx from "clsx";
import Image from "next/image";
import type { ReactNode } from "react";
import { Canister } from "@/components/art/Canister";
import { ProductArt } from "@/components/art/ProductArt";
import { Shaker } from "@/components/art/Shaker";
import type { ArtSpec, StoreImage } from "@/lib/commerce/types";

interface ProductGalleryProps {
  art: ArtSpec;
  photos: StoreImage[];
  /** Show the Starter Kit (canister + shaker) as the fourth cell. */
  showKit?: boolean;
}

/**
 * Packaging art first, then photography. The Starter Kit cell sits between
 * the photos, mirroring how the first box arrives. Swipes on mobile (CSS).
 */
export function ProductGallery({ art, photos, showKit = false }: ProductGalleryProps) {
  const cells: { key: string; className: string; content: ReactNode }[] = [
    { key: "art", className: "g-pouch gmain", content: <ProductArt art={art} /> },
    ...photos.map((photo, index) => ({
      key: photo.url,
      className: "g-photo",
      content: (
        <Image
          className="cover"
          src={photo.url}
          alt={photo.altText}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 640px) 86vw, 28vw"
          priority={index === 0}
        />
      ),
    })),
  ];

  if (showKit) {
    cells.splice(Math.min(3, cells.length), 0, {
      key: "kit",
      className: "g-kit",
      content: (
        <div className="kit">
          <Canister />
          <Shaker />
        </div>
      ),
    });
  }

  return (
    <div className="gallery">
      {cells.map((cell) => (
        <div key={cell.key} className={clsx("gcell", cell.className)}>
          {cell.content}
        </div>
      ))}
    </div>
  );
}
