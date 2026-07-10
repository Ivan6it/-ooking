import type { ReactNode } from 'react';
import styles from './iconActive.module.css';

type IconActiveProps = {
  svg: ReactNode;
  handleClick?: () => void;
  className?: string;
  text?: string;
  classNameText?: string;
  classNameSvg?: string;
  disabled?: boolean;
};

export function IconActive({
  svg,
  handleClick,
  className,
  text,
  classNameText,
  classNameSvg,
  disabled = false,
}: IconActiveProps) {
  return (
    <button disabled={disabled} className={`${styles.icon} ${className}`} onClick={handleClick}>
      <div className={classNameSvg}>{svg}</div>
      {text && <p className={classNameText}>{text}</p>}
    </button>
  );
}
