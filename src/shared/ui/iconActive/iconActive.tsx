import type { ReactNode } from 'react';
import styles from './iconActive.module.css';

type IconActiveProps = {
  svg: ReactNode;
  hahdleClick?: () => void;
  className?: string;
  text?: string;
  classNameText?: string;
};

export function IconActive({ svg, hahdleClick, className, text, classNameText }: IconActiveProps) {
  return (
    <button className={`${styles.icon} ${className}`} onClick={hahdleClick}>
      {svg}
      {text && <p className={classNameText}>{text}</p>}
    </button>
  );
}
