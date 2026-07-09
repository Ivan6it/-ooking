import styles from './headerSpecButton.module.css';

type specButton = {
  text: string;
  handleClickSpecButton: () => {};
};

export function SpecButton({ handleClickSpecButton, text }: specButton) {
  return (
    <button className={styles.specButton} onClick={handleClickSpecButton}>
      {text}
    </button>
  );
}
