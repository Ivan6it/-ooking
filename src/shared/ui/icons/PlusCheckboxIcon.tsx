type PlusCheckboxIconProps = {
  active?: boolean;
};

export function PlusCheckboxIcon({ active = false }: PlusCheckboxIconProps) {
  return (
    <>
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="none"
          viewBox="0 0 34 34">
          <rect width="33" height="33" x=".5" y=".5" stroke="#67bb5a" rx="1.5" />
          <path
            stroke="#67bb5a"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8.5 17h17M17 25.5v-17"
          />
        </svg>
      )}
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="none"
          viewBox="0 0 34 34">
          <rect width="34" height="34" fill="#67bb5a" rx="2" />
          <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8.5 17h17M17 25.5v-17"
          />
        </svg>
      )}
    </>
  );
}
