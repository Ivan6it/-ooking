type BookmarkProps = {
  active?: boolean;
  color: string;
};

export function Bookmark({ active = false, color }: BookmarkProps) {
  return (
    <>
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="none"
          viewBox="0 0 34 34">
          <g clip-path="url(#a)">
            <path
              fill={color}
              d="M4.25 4.25v28.688a1.062 1.062 0 0 0 1.572.932L17 27.772l11.177 6.098a1.063 1.063 0 0 0 1.573-.932V4.25A4.25 4.25 0 0 0 25.5 0h-17a4.25 4.25 0 0 0-4.25 4.25"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h34v34H0z" />
            </clipPath>
          </defs>
        </svg>
      )}
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="none"
          viewBox="0 0 34 34">
          <path
            fill={color}
            d="M4.25 4.25A4.25 4.25 0 0 1 8.5 0h17a4.25 4.25 0 0 1 4.25 4.25v28.688a1.062 1.062 0 0 1-1.651.883L17 27.84 5.901 33.822a1.061 1.061 0 0 1-1.651-.885zM8.5 2.125A2.125 2.125 0 0 0 6.375 4.25v26.703l10.036-5.274a1.06 1.06 0 0 1 1.178 0l10.036 5.274V4.25A2.125 2.125 0 0 0 25.5 2.125z"
          />
        </svg>
      )}
    </>
  );
}
