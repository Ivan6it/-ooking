import styles from './defaultButton.module.css';

type defaultButtonProps = {
  text: string;
  handleClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

export function DefaultButton({
  text,
  className,
  handleClick,
  disabled = false,
  type = 'button',
}: defaultButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${styles.defaultButton} ${className}`}>
      {text}
    </button>
  );
}
