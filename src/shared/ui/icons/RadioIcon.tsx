type RadioIconProps = {
  active?: boolean;
  color?: string;
};

export function RadioIcon({ active = false, color = '' }: RadioIconProps) {
  return (
    <>
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11.5" stroke={color} />
        </svg>
      )}
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill={color} />
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M7.277 10.615 6 12.138l5.33 4.472 7.668-9.137L13.668 3h-.001l3.807 3.195-6.39 7.615z"
            clip-rule="evenodd"
          />
        </svg>
      )}
    </>
  );
}
