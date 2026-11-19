type Props = {
  href: string;
  label: string;
  src: string;
  className?: string;
  imgClassName: string;
  height: number;
};

export function PartnerLogoLink({
  href,
  label,
  src,
  className,
  imgClassName,
  height,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={imgClassName} height={height} />
    </a>
  );
}