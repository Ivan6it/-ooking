type ComplexityIconProps = {
  complexity: 'easy' | 'normal' | 'hard';
};

export function ComplexityIcon({ complexity }: ComplexityIconProps) {
  return (
    <>
      {complexity === 'easy' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="106"
          height="106"
          fill="none"
          viewBox="0 0 106 106">
          <circle cx="52.5" cy="53.5" r="38" stroke="#e9f0f3" />
          <mask id="a" fill="#fff">
            <path d="M90.08 58.528a.89.89 0 0 0 1.023-.764 38.5 38.5 0 0 0-39.782-43.321.89.89 0 0 0-.848.954c.033.5.465.879.966.859a36.683 36.683 0 0 1 37.868 41.236.926.926 0 0 0 .773 1.036" />
          </mask>
          <path
            stroke="#91d785"
            strokeWidth="4"
            d="M90.08 58.528a.89.89 0 0 0 1.023-.764 38.5 38.5 0 0 0-39.782-43.321.89.89 0 0 0-.848.954c.033.5.465.879.966.859a36.683 36.683 0 0 1 37.868 41.236.926.926 0 0 0 .773 1.036Z"
            mask="url(#a)"
          />
        </svg>
      )}
      {complexity === 'normal' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="107"
          height="107"
          fill="none"
          viewBox="0 0 107 107">
          <circle cx="53.199" cy="53.627" r="38" stroke="#e9f0f3" />
          <mask id="a" fill="#fff">
            <path d="M56.29 91.362a.9.9 0 0 0 .982.836 38.911 38.911 0 0 0-5.768-77.584.9.9 0 0 0-.848.972.936.936 0 0 0 .984.858 37.075 37.075 0 0 1 5.496 73.923.936.936 0 0 0-.846.995" />
          </mask>
          <path
            stroke="#fff16f"
            strokeWidth="4"
            d="M56.29 91.362a.9.9 0 0 0 .982.836 38.911 38.911 0 0 0-5.768-77.584.9.9 0 0 0-.848.972.936.936 0 0 0 .984.858 37.075 37.075 0 0 1 5.496 73.923.936.936 0 0 0-.846.995Z"
            mask="url(#a)"
          />
        </svg>
      )}
      {complexity === 'hard' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="107"
          height="107"
          fill="none"
          viewBox="0 0 107 107">
          <circle cx="53.5" cy="53.5" r="37.5" stroke="#fd3b3b" strokeWidth="2" />
        </svg>
      )}
    </>
  );
}
