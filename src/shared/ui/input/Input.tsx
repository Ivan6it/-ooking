import styles from './Input.module.css';

type InputProps = {
  label?: string;
  classLabel?: string;
  type: string;
  placeholder?: string;
  classInput?: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export function Input({
  classLabel,
  label,
  type,
  placeholder,
  classInput,
  id,
  value,
  onChange,
  required = true,
}: InputProps) {
  return (
    <>
      {label && (
        <label className={`${styles.label} ${classLabel}`} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${classInput}`}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
