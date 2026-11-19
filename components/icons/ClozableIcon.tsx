type Props = { className?: string };

/** Subtle credit mark matching Owen/dett icon size on the homepage. */
export function ClozableIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-hidden
      className={className}
    >
      <rect width="100" height="100" rx="22" fill="#0B0D12" />
      <path
        fill="#FFFFFF"
        d="M34 68V32h16c9.5 0 16 5.8 16 14.2 0 5.2-2.6 9.4-7 11.7l10.5 10.1H56.5L47.5 59.2H42v8.8H34zm8-16.4h7.2c4.4 0 7.2-2.4 7.2-6.2s-2.8-6.3-7.2-6.3H42v12.5z"
      />
    </svg>
  );
}