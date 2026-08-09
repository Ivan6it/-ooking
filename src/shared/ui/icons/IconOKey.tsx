export function IconOKey({ active = false, size = 32 }) {
  return (
    <>
      {active && (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
          <rect width="31" height="31" x=".5" y=".5" fill="rgba(103, 187, 90, 1)" rx="2.5" />
        </svg>
      )}
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill="none"
          viewBox="0 0 32 32">
          <rect width="31" height="31" x=".5" y=".5" stroke="#b5c3c9" rx="2.5" />
        </svg>
      )}
    </>
  );
}
