import { DettIcon } from "@/components/icons/DettIcon";
import { OwenIcon } from "@/components/icons/OwenIcon";
import { PartnerCreditIcon } from "@/components/PartnerCreditIcon";

type Props = {
  dettGradientId: string;
  layout?: "inline" | "stack";
};

export function PartnerCredits({ dettGradientId, layout = "inline" }: Props) {
  const wrapClass = layout === "inline" ? "credits-inline" : "credits";

  return (
    <div className={wrapClass}>
      <div className="credit">
        <OwenIcon className="credit-icon" />
        Powered by Owen AI
      </div>
      <a
        className="credit"
        href="https://dett.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <DettIcon gradientId={dettGradientId} className="credit-icon" />
        Calculations by dett.io
      </a>
      <div className="credit">
        <PartnerCreditIcon src="/partners/clozable-icon-color.svg" />
        Loan readiness from{" "}
        <a
          href="https://clozable.com"
          target="_blank"
          rel="noopener noreferrer"
          className="credit-nested-link"
        >
          Clozable
        </a>
      </div>
      <div className="credit">
        <PartnerCreditIcon src="/partners/ratesboard-icon-color.svg" />
        Pricing from{" "}
        <a
          href="https://ratesboard.com"
          target="_blank"
          rel="noopener noreferrer"
          className="credit-nested-link"
        >
          Ratesboard
        </a>
      </div>
    </div>
  );
}