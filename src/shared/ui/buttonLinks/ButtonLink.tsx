import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  to: string;
  children: string;
  className?: string;
};

export function ButtonLink({ to, children, className }: ButtonLinkProps) {
  return (
    <Link className={`${styles.buttonLink} ${className}`} to={to}>
      {children}
    </Link>
  );
}
