type EllipseNumberIconProps = {
  number: number;
  active?: boolean;
};

export function EllipseNumberIcon({ number, active = false }: EllipseNumberIconProps) {
  return (
    <>
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="57"
          height="57"
          fill="none"
          viewBox="0 0 57 57">
          <circle cx="28.5" cy="28.5" r="28.5" fill="#edffe3" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
            fill="rgba(28, 31, 29, 1)"
            fontWeight="600">
            {number}
          </text>
        </svg>
      )}
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="57"
          height="57"
          fill="none"
          viewBox="0 0 57 57">
          <circle cx="28.5" cy="28.5" r="27.5" fill="#edffe3" stroke="#67bb5a" strokeWidth="2" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
            fill="rgba(28, 31, 29, 1)"
            fontWeight="600">
            {number}
          </text>
        </svg>
      )}
    </>
  );
}
