import styles from './GuidePage.module.css';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import sectionProducts from '@/data/directorySection.json';
import { DirectorySection } from '@/shared/ui/widgets/DirectorySection';

export function GuidePage() {
  return (
    <div className={styles.guidePage}>
      <h2 className={styles.guidePage__heading}>Справочник</h2>
      <p className={styles.guidePage__text}>
        Справочник ингредиентов — для тех, кто хочет готовить уверенно, но без напряжения.
        <br />
        <br /> Здесь нет жёстких правил, нет «вы должны». Только спокойные, дружелюбные описания —
        как будто кто-то из семьи объясняет вам, что за продукт вы держите в руке.
        <br />
        <br /> Просто — не значит скучно. Ясно — не значит упрощённо.
        <br />
        <br /> Пусть каждый шаг в рецепте будет понятен — без догадок, без сомнений.
      </p>
      <div className={styles.guidePage__list}>
        {sectionProducts.map((item) => (
          <DirectorySection data={item} />
        ))}
      </div>
      <Mailing />
    </div>
  );
}
