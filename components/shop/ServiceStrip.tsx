import { Icon } from "@/components/ui/Icon";
import { shopStrip } from "@/lib/data/product-content";

export function ServiceStrip() {
  return (
    <section className="sec">
      <div className="wrap strip">
        {shopStrip.map((item) => (
          <div className="strip-item" key={item.title}>
            <Icon name={item.icon} size={24} />
            <div>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
