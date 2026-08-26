import styles from './DirectorySectionPage.module.css';
import directorySection from '@/data/directorySection.json';
import { DirectorySectionItem } from '@/shared/ui/widgets/DirectorySectionItem';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { useParams, Link } from 'react-router-dom';
import { NotFoundPage } from '@/shared/ui/pages/NotFoundPage';

export default function DirectorySectionPage() {
  const { sectionName } = useParams<{ sectionName: string | undefined }>();

  const currentSection = sectionName
    ? directorySection.filter((section) => section.id === sectionName)
    : [];
  if (currentSection.length === 0) {
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
        {currentSection[0].products.map((item) => (
          <li key={item.name}>
            <DirectorySectionItem sectionName={sectionName!} data={item} />
          </li>
        ))}
      </ul>
      <Mailing />
    </div>
  );
}
