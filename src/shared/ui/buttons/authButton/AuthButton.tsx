import styles from './AuthButton.module.css';

type AuthButtonProps = {
  handleClick?: () => void;
  text: string;
};

export function AuthButton({ handleClick, text }: AuthButtonProps) {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}
