import styles from './DirectorySection.module.css';
import type { DirectorySectionData } from '@/data/directorySection.json';

type DirectorySectionProps = {
  data: DirectorySectionData;
};

export function DirectorySection({ data }: DirectorySectionProps) {
  return (
    <div className={styles.directorySection}>
      <img loading="lazy" className={styles.directorySection__img} src={data.img} />
      <span className={styles.directorySection__text}>{data.name}</span>
    </div>
  );
}
