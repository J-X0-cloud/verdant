import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { subscribePerks } from "@/lib/data/product-content";

export function SubscribePerks() {
  return (
    <section className="sec sec-cream">
      <div className="wrap">
        <SectionHead layout="center" eyebrow="Subscribe & Save" title="Every box, on your terms" />
        <div className="perks">
          {subscribePerks.map((perk) => (
            <div className="perk" key={perk.title}>
              <Icon name={perk.icon} size={28} />
              <h3>{perk.title}</h3>
              <p>{perk.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
