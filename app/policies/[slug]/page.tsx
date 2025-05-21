import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getPolicy, policies } from "@/lib/data/policies";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const policy = getPolicy((await params).slug);
  return policy ? { title: policy.title } : {};
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default async function PolicyPage({ params }: PolicyPageProps) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <section className="sec sec-tight">
      <div className="wrap policy">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: policy.title }]} />
        <h1 className="page-title">{policy.title}</h1>
        <p className="fine">
          Last updated {dateFormat.format(new Date(`${policy.updated}T12:00:00`))}
        </p>
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
