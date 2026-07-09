import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  to: string;
  children: string;
};

export function ButtonLink({ to, children }: ButtonLinkProps) {
  return (
    <Link className={styles.buttonLink} to={to}>
      {children}
    </Link>
  );
}
