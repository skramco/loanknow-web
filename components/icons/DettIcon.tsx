type Props = { gradientId?: string; className?: string };

export function DettIcon({ gradientId = "dettGrad", className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2100 2100"
      fill="none"
      role="img"
      aria-label="dett.io icon"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="150"
          y1="0"
          x2="1950"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0752AB" />
          <stop offset="1" stopColor="#206EC2" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        d="M150 330L1285 330A665 665 0 0 1 1950 995L1950 1105A665 665 0 0 1 1285 1770L150 1770ZM620 600L1500 1025L620 1480ZM150 795L620 1030L620 1100L150 865ZM620 1405L620 1485L150 1720L150 1640Z"
      />
    </svg>
  );
}