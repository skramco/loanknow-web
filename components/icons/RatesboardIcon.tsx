type Props = { className?: string };

/** Subtle credit mark matching Owen/dett icon size on the homepage. */
export function RatesboardIcon({ className }: Props) {
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
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M26 62 L42 48 L56 56 L74 36"
      />
      <circle cx="74" cy="36" r="5" fill="#FFFFFF" />
    </svg>
  );
}