type ArrowFilterIconProps = {
  className?: string;
  size?: number;
};

export function ArrowFilterIcon({ className, size = 20 }: ArrowFilterIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size / 2}
      fill="none"
      viewBox="0 0 20 10">
      <path
        fill="#67bb5a"
        d="M18.422 9.927c-.331 0-.652-.114-.907-.326L9.922 3.255l-7.608 6.12a1.417 1.417 0 0 1-1.997-.213 1.417 1.417 0 0 1 .212-1.997L9.03.322a1.42 1.42 0 0 1 1.8 0l8.5 7.084a1.417 1.417 0 0 1 .184 1.997 1.42 1.42 0 0 1-1.091.524"
      />
    </svg>
  );
}
