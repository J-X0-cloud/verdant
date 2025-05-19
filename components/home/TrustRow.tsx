import { Icon } from "@/components/ui/Icon";
import { trustItems } from "@/lib/data/home";

export function TrustRow() {
  return (
    <section className="trust">
      <div className="wrap trust-row">
        {trustItems.map((item) => (
          <div className="trust-item" key={item.title}>
            <Icon name={item.icon} size={26} />
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
