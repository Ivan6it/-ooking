import { RadioIcon } from '@/shared/ui/icons';
import styles from './RadioGroup.module.css';

type RadioGroupProps = {
  id: string;
  name: string;
  value: string;
  classNameInput?: string;
  classNameLabel?: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
};

export function RadioGroup({
  id,
  name,
  value,
  classNameInput,
  label,
  classNameLabel,
  checked,
  onChange,
}: RadioGroupProps) {
  return (
    <label className={classNameLabel}>
      <RadioIcon active={checked} />
      <input
        className={`${styles.radioGroup__input} ${classNameInput}`}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  );
}
