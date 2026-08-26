export function CrossIcon({ className = '', size = 24, color = '#1c1f1d' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill={color}
        fillRule="evenodd"
        d="M10.05 12 0 22.05 1.95 24 12 13.95 22.05 24 24 22.05 13.95 12 24 1.95 22.05 0 12 10.05 1.95 0 0 1.95z"
        clipRule="evenodd"
      />
    </svg>
  );
}
