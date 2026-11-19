import { PartnerLogoLink } from "@/components/PartnerLogoLink";

const FOOTER_LOGO_HEIGHT_PX = 13;

type CreditRow = {
  id: string;
  lead: string;
  href: string;
  label: string;
  src: string;
};

const rows: CreditRow[] = [
  {
    id: "owen",
    lead: "Powered by",
    href: "https://owenai.com",
    label: "Owen AI",
    src: "/partners/owen-wordmark.svg",
  },
  {
    id: "dett",
    lead: "Calculations by",
    href: "https://dett.io",
    label: "dett.io",
    src: "/partners/dett-logo.png",
  },
  {
    id: "clozable",
    lead: "Loan readiness by",
    href: "https://clozable.com",
    label: "Clozable",
    src: "/partners/clozable-wordmark.svg",
  },
  {
    id: "ratesboard",
    lead: "Pricing from",
    href: "https://ratesboard.com",
    label: "Ratesboard",
    src: "/partners/ratesboard-wordmark-color.svg",
  },
];

export function PartnerCredits() {
  return (
    <div className="credits-inline">
      {rows.map((row) => (
        <div className="credit" key={row.href}>
          <span className="credit-lead">{row.lead}</span>
          <PartnerLogoLink
            href={row.href}
            label={row.label}
            src={row.src}
            className="credit-wordmark-link"
            imgClassName={`credit-wordmark partner-logo partner-logo--${row.id}`}
            height={FOOTER_LOGO_HEIGHT_PX}
          />
        </div>
      ))}
    </div>
  );
}