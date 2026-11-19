type Props = { className?: string };

/** House mark without wordmark — from design prototype. */
export function LoanKnowMark({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-25.027 -51.027 362.887 362.887"
      fill="none"
      role="img"
      aria-label="LoanKnow"
      className={className}
    >
      <g fill="#000000" transform="translate(0 0) scale(1)">
        <path d="M 56.867188 147.246094 L 56.867188 204.082031 L 156.375 258.355469 L 255.882812 204.082031 L 255.882812 147.246094 L 156.375 201.523438 Z M 156.375 2.605469 L 0.00390625 87.855469 L 156.375 173.105469 L 284.316406 103.34375 L 284.316406 201.523438 L 312.746094 201.523438 L 312.746094 87.855469 Z M 156.375 2.605469 " />
        <g transform="translate(232, 26)">
          <path d="M 0.566406 0.710938 L 25.238281 0.710938 L 25.238281 40.707031 L 0.566406 40.707031 Z M 0.566406 0.710938 " />
        </g>
      </g>
    </svg>
  );
}