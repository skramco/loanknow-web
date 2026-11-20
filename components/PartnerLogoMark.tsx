type Props = {
  label: string;
  src: string;
  className?: string;
  imgClassName: string;
  height: number;
};

/** Non-clickable partner logo (same visual treatment as linked logos). */
export function PartnerLogoMark({
  label,
  src,
  className,
  imgClassName,
  height,
}: Props) {
  return (
    <span className={className} role="img" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={imgClassName} height={height} />
    </span>
  );
}