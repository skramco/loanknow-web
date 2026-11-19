type Props = {
  src: string;
};

/** Fixed-size partner mark (matches Owen/dett credit icons). */
export function PartnerCreditIcon({ src }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={15} height={15} className="credit-icon" aria-hidden />
  );
}