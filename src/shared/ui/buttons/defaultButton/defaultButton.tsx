import styles from './defaultButton.module.css';

type defaultButtonProps = {
  text: string;
  handleClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function DefaultButton({
  text,
  className,
  handleClick,
  disabled = false,
}: defaultButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${styles.defaultButton} ${className}`}>
      {text}
    </button>
  );
}
