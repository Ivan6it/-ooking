import styles from './GuidePage.module.css';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { DirectorySection } from '@/shared/ui/widgets/DirectorySection';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { DirectorySectionData } from '@/types/directorySection';

export default function GuidePage() {
  const [sectionProducts, setSectionProducts] = useState<DirectorySectionData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/directorySection');
      if (!res.ok) {
        throw new Error('Failed to fetch directorySection');
      }
      const data = await res.json();
      setSectionProducts(data);
    };
    loadData();
  }, []);

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
      <ul className={styles.guidePage__list}>
        {sectionProducts.map((item) => (
          <li key={item.id}>
            <Link
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              to={`/guide/${item.id}`}>
              <DirectorySection data={item} />
            </Link>
          </li>
        ))}
      </ul>
      <Mailing />
    </div>
  );
}
