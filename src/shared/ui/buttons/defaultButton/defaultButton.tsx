import styles from './defaultButton.module.css';

type defaultButtonProps = {
  text: string;
  handleClick?: () => void;
  className?: string;
};

export function DefaultButton({ text, className, handleClick }: defaultButtonProps) {
  return (
    <button onClick={handleClick} className={`${styles.defaultButton} ${className}`}>
      {text}
    </button>
  );
}
