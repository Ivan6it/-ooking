import styles from './DirectorySectionPage.module.css';
import { DirectorySectionItem } from '@/shared/ui/widgets/DirectorySectionItem';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotFoundPage } from '../NotFoundPage';
import type { RootState } from '@/store';
import type { DirectorySectionData, DirectoryProduct } from '@/types/directorySection';

export default function DirectorySectionPage() {
  const { sectionName } = useParams<{ sectionName: string | undefined }>();
  const { directorySection, loading } = useSelector((state: RootState) => state.directorySection);

  const currentSection = sectionName
    ? directorySection.filter((section: DirectorySectionData) => section.id === sectionName)
    : [];
  if (loading || currentSection.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.directorySectionPage}>
      <span className={styles.directorySectionPage__text}>
        <Link to={'/guide'} className={styles.directorySectionPage__text__link}>
          Справочник
        </Link>{' '}
        / <span>{currentSection[0].name}</span>
      </span>
      <h2 className={styles.directorySectionPage__heading}>{currentSection[0].name}</h2>
      <ul className={styles.directorySectionPage__list}>
        {currentSection[0].products.map((item: DirectoryProduct) => (
          <li key={item.name}>
            <DirectorySectionItem sectionName={sectionName!} data={item} />
          </li>
        ))}
      </ul>
      <Mailing />
    </div>
  );
}
