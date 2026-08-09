import { ArrowFilterIcon } from '../icons';
import styles from './Select.module.css';
import { useState, useEffect, useRef } from 'react';

type OptionType = {
  value: string;
  name: string;
};

type SelectProps = {
  options: OptionType[];
  classSelect?: string;
  classOption?: string;
  classList?: string;
  onChange?: (value: string) => void;
  firstElement?: boolean;
  classValue?: string;
  defaultOption?: OptionType;
};

export function Select({
  options,
  classSelect,
  classOption,
  onChange,
  classList,
  firstElement = true,
  classValue,
  defaultOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(() => {
    return defaultOption || (firstElement ? options[0] : options[1]) || null;
  });
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  const selectedValue = selectedOption?.name || options[0].name;

  return (
    <div
      tabIndex={0}
      ref={selectRef}
      className={`${styles.customSelect} ${classSelect}`}
      onClick={toggle}>
      <span className={`${styles.selectedValue} ${classValue}`}>{selectedValue}</span>
      <ArrowFilterIcon className={`${styles.icon} ${isOpen ? styles.active : ''}`} />

      {isOpen && (
        <ul className={`${styles.dropdown} ${classList}`}>
          {options.map((opt, index) => {
            if (!firstElement && index === 0) return null;

            return (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`${styles.dropdownItem} ${classOption} ${selectedOption?.value === opt.value ? styles.selected : ''}`}>
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
