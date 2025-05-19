import { Disclosure } from "@/components/ui/Disclosure";
import { faqs } from "@/lib/data/home";
import { site } from "@/lib/data/site";

export function FaqSection() {
  return (
    <section className="sec" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-side">
          <p className="eyebrow">Questions</p>
          <h2>Good to know</h2>
          <p>
            Can&apos;t find what you&apos;re looking for? Our team answers every email within one
            business day.
          </p>
          <a className="btn btn-ink" href={`mailto:${site.email}`}>
            Email the team
          </a>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <Disclosure
              key={faq.question}
              className="faq"
              summary={faq.question}
              open={index === 0}
            >
              {faq.answer}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
