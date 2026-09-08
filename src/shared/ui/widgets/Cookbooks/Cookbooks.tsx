import styles from './Cookbooks.module.css';
import users from '@/data/users.json';
import { CookbooksItem } from '@/shared/ui/widgets/CookbooksItem';
import { IconActive } from '@/shared/ui/iconActive';
import { PlusEllipse } from '@/shared/ui/icons';
import type { Food } from '@/types/foods';

type CookbooksProps = {
  handleClick?: (recipes: Food[], name: string) => void;
  createBook: () => void;
};

export function Cookbooks({ handleClick, createBook }: CookbooksProps) {
  const user = users[0];
  return (
    <div className={styles.cookbooks}>
      {user.cookbooks.map((item, index) => (
        <CookbooksItem key={index} handleClick={handleClick} data={item} />
      ))}
      <IconActive
        handleClick={() => createBook()}
        className={styles.cookbooks__container}
        svg={<PlusEllipse />}
        text={
          <>
            Создайте новую
            <br />
            кулинарную книгу
          </>
        }
      />
    </div>
  );
}
