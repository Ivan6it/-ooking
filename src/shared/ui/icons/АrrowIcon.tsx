type ArrowIconProps = {
  color: string;
  vector: 'left' | 'right';
};

export function ArrowIcon({ color, vector }: ArrowIconProps) {
  return (
    <>
      {vector === 'right' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="28"
          fill="none"
          viewBox="0 0 31 28">
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M17.25 1.5 29.5 13.75 17.25 26M29.5 13.75h-28z"
          />
        </svg>
      )}
      {vector === 'left' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="28"
          fill="none"
          viewBox="0 0 31 28">
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M13.75 1.5 1.5 13.75 13.75 26M1.5 13.75h28z"
          />
        </svg>
      )}
    </>
  );
}
