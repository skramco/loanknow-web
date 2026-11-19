import { ClozableIcon } from "@/components/icons/ClozableIcon";
import { DettIcon } from "@/components/icons/DettIcon";
import { OwenIcon } from "@/components/icons/OwenIcon";
import { RatesboardIcon } from "@/components/icons/RatesboardIcon";

type Props = {
  dettGradientId: string;
  layout?: "inline" | "stack";
};

/** Homepage/sidebar partner credits — Owen, dett.io, Clozable, Ratesboard. */
export function PartnerCredits({ dettGradientId, layout = "inline" }: Props) {
  const wrapClass =
    layout === "inline" ? "credits-inline" : "credits";

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
      <a
        className="credit"
        href="https://clozable.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ClozableIcon className="credit-icon" />
        Ready to buy? Get loan-ready with Clozable
      </a>
      <div className="credit">
        <RatesboardIcon className="credit-icon" />
        Live pricing provided by lenders from{" "}
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