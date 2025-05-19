import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { ingredientTiles } from "@/lib/data/home";

export function IngredientTiles() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead layout="row" eyebrow="Sourced whole" title="Real food, dried gently">
          We work with growers we know by name and dry ingredients at low temperatures, so every
          scoop tastes like the plants it came from.
        </SectionHead>
        <div className="igrid">
          {ingredientTiles.map((tile) => (
            <figure className="itile" key={tile.title}>
              <Image
                src={tile.image.url}
                alt=""
                width={tile.image.width}
                height={tile.image.height}
                sizes="(max-width: 640px) 50vw, 16vw"
              />
              <figcaption>
                <b>{tile.title}</b>
                <span>{tile.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
