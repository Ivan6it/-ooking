import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <img loading="lazy" className={styles.notFoundPage__img} src={'/images/NotFound.png'} />
      <div className={styles.notFoundPage__container}>
        <h2 className={styles.notFoundPage__container__heading}>Упс! Страница не найдена.</h2>
        <p className={styles.notFoundPage__container__text}>
          Этот раздел еще находится в разработке.
          <br />
          Еще чуть-чуть и он будет готов!
        </p>
      </div>
      <Link to={'/'}>
        <DefaultButton className={styles.notFoundPage__button} text="Вернуться на главную" />
      </Link>
    </div>
  );
}
