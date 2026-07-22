type LikeIconProps = {
  active?: boolean;
  color: string;
};

export function LikeIcon({ active = false, color }: LikeIconProps) {
  return (
    <>
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="none"
          viewBox="0 0 34 34">
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.879 29.48c-.482.17-1.275.17-1.757 0-4.108-1.402-13.288-7.253-13.288-17.17 0-4.377 3.527-7.918 7.877-7.918A7.81 7.81 0 0 1 17 7.565a7.83 7.83 0 0 1 6.29-3.173c4.349 0 7.876 3.541 7.876 7.919 0 9.917-9.18 15.767-13.288 17.17"
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
          <path
            fill={color}
            d="M23.29 4.392A7.86 7.86 0 0 0 17 7.55a7.86 7.86 0 0 0-6.29-3.16c-4.349 0-7.876 3.542-7.876 7.92 0 1.686.27 3.244.737 4.689 2.238 7.083 9.137 11.32 12.551 12.48.482.17 1.275.17 1.757 0 3.414-1.16 10.313-5.397 12.552-12.48.467-1.445.736-3.003.736-4.69 0-4.377-3.527-7.918-7.876-7.918"
          />
        </svg>
      )}
    </>
  );
}

export default LikeIcon;
