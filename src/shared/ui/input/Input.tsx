import styles from './Input.module.css';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { IconActive } from '../iconActive';
import { EyeIcon } from '@/shared/ui/icons';

interface Validator {
  fn: (num: number, text: string, nameResult: boolean) => void;
  id: number;
}

type InputProps = {
  label?: string;
  classLabel?: string;
  type: string;
  placeholder?: string;
  classInput?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  svg?: ReactNode;
  handleBlur?: () => void;
  error?: string;
  className?: string;
  disabled?: boolean;
  passwordInput?: boolean;
  validatePassword?: Validator;
  validateName?: (text: string, result: boolean) => void;
  nameInput?: boolean;
  userName?: string;
  classSvg?: string;
  readOnly?: boolean;
  classError?: string;
};

export function Input({
  nameInput = false,
  passwordInput = false,
  classLabel,
  label,
  type,
  placeholder,
  classInput,
  id,
  value,
  onChange,
  required = true,
  svg,
  error,
  handleBlur,
  className,
  disabled = false,
  validatePassword,
  validateName,
  userName = '',
  classSvg,
  readOnly = false,
  classError = '',
}: InputProps) {
  const [passwordError, setPasswordError] = useState({ text: '', active: false });
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState({ text: '', active: false });
  const [isTouched, setIsTouched] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(userName);
  }, [userName]);

  //Блок с валидацией имени
  function validateFormFieldsName(value: string): string {
    const namePattern = /^[^0-9_@!]+$/;
    if (!namePattern.test(value)) {
      if (validateName) {
        validateName(value, false);
      }
      return 'Имя содержит недопустимые символы';
    }
    if (value.trim().length < 2) {
      if (validateName) {
        validateName(value, false);
      }
      return 'Имя должно содержать минимум 2 символа';
    }
    if (validateName) {
      validateName(value, true);
    }
    return '';
  }

  function handleBlurName() {
    setIsTouched(true);
    setNameError({ text: validateFormFieldsName(name), active: true });
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  //Конец блока с валидацией имени

  //Блок с валидацией пароля
  function validateFormFieldsPassword(value: string): string {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(value)) {
      validatePassword?.fn(validatePassword.id, password, false);
      return 'Некорректный пароль';
    }
    validatePassword?.fn(validatePassword.id, password, true);
    return '';
  }

  function handleBlurPassword() {
    setIsTouched(true);
    setPasswordError({ text: validateFormFieldsPassword(password), active: true });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  //Конец блока с валидацией пароля

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={`${styles.label} ${classLabel}`} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          readOnly={readOnly}
          onBlur={passwordInput ? handleBlurPassword : nameInput ? handleBlurName : handleBlur}
          value={passwordInput ? password : nameInput ? name : value}
          id={id}
          type={passwordInput ? (passwordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={`${styles.input} ${classInput} ${
            passwordError.active
              ? passwordError.text
                ? styles.error__input
                : styles.valid__input
              : ''
          }`}
          onChange={passwordInput ? handlePasswordChange : nameInput ? handleNameChange : onChange}
          required={required}
          disabled={disabled}
        />

        {passwordInput && (
          <IconActive
            className={`${styles.svg} ${classSvg}`}
            handleClick={() => setPasswordVisible((prev) => !prev)}
            svg={<EyeIcon active={passwordVisible} className={styles.svg__eye} />}
          />
        )}

        {svg && <div className={styles.svg}>{svg}</div>}
      </div>

      {nameInput && nameError.text && <div className={styles.text__error}>{nameError.text}</div>}

      {passwordInput && passwordError.text && (
        <div className={styles.text__error}>{passwordError.text}</div>
      )}

      {error && <div className={`${styles.text__error} ${classError}`}>{error}</div>}
    </div>
  );
}
