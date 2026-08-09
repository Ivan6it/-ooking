import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './LikeSection.module.css';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';

export function LikeSection() {
  //это затычка, когда сюда попадут реальные данные, надо будет контролировать потоки
  const step = true;
  return (
    <div>
      {!step && <SectionCards className={styles.likeSection} ogrinicator={true} />}
      {step && (
        <div className={styles.likeSection__notItem}>
          <img className={styles.likeSection__notItem__img} src="src/images/LikeNotItem.png" />
          <div className={styles.likeSection__notItem__text}>
            <h2>Похоже, тебе еще ничего не понравилось!</h2>
            <p>
              Если тебе понравился рецепт, просто нажмите на сердечко,
              <br />
              чтобы сохранить его на потом! Он будет ждать тебя прямо здесь.
            </p>
          </div>
          <DefaultButton
            className={styles.likeSection__notItem__button}
            text="Посмотреть рецепты"
          />
        </div>
      )}
    </div>
  );
}
