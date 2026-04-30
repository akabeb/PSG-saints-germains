export function TitleDecor({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      style={{ color: "var(--wp-ornament)" }}
      xmlns="http://www.w3.org/2000/svg"
      width="41.125"
      height="9.146"
      aria-hidden
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        d="M40.881 8.576L20.562.591.244 8.576"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        d="M40.881.591L20.562 8.576.243.591"
      />
    </svg>
  );
}
