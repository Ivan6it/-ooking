import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <img className={styles.notFoundPage__img} src={'src/images/NotFound.png'} />
      <div className={styles.notFoundPage__container}>
        <h2 className={styles.notFoundPage__container__heading}>Упс! Страница не найдена.</h2>
        <p className={styles.notFoundPage__container__text}>
          Этот раздел еще находится в разработке.
          <br />
          Еще чуть-чуть и он будет готов!
        </p>
      </div>
      <DefaultButton className={styles.notFoundPage__button} text="Вернуться на главную" />
    </div>
  );
}
