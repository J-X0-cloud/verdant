import Link from "next/link";
import { Pouch } from "@/components/art/Pouch";
import { SectionHead } from "@/components/ui/SectionHead";
import { flavours, greensFlavours } from "@/lib/data/flavours";

export function FlavourTiles() {
  return (
    <section className="sec" id="flavors">
      <div className="wrap">
        <SectionHead
          layout="center"
          eyebrow="Three flavors"
          title="Greens that taste like you'd hoped"
        >
          No grassy aftertaste. Sweetened lightly with monk fruit, never with anything artificial.
        </SectionHead>
        <div className="flavors">
          {greensFlavours.map((id) => (
            <Link
              key={id}
              className={`flavor fl-${id}`}
              href={`/products/daily-greens?flavor=${id}`}
            >
              <div className="flavor-art">
                <Pouch flavour={id} />
              </div>
              <h3>{flavours[id].name}</h3>
              <p>{flavours[id].note}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
