import styles from './DirectorySectionPage.module.css';
import directorySection from '@/data/directorySection.json';
import { DirectorySectionItem } from '@/shared/ui/widgets/DirectorySectionItem';
import { Mailing } from '@/shared/ui/widgets/Mailing';

export function DirectorySectionPage() {
  return (
    <div className={styles.directorySectionPage}>
      <span className={styles.directorySectionPage__text}>
        Справочник / <span>{directorySection[0].name}</span>
      </span>
      <h2 className={styles.directorySectionPage__heading}>{directorySection[0].name}</h2>
      <div className={styles.directorySectionPage__list}>
        {directorySection[0].products.map((item) => (
          <DirectorySectionItem data={item} />
        ))}
      </div>
      <Mailing />
    </div>
  );
}
