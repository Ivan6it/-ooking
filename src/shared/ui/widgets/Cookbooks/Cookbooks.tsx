import styles from './Cookbooks.module.css';
import { CookbooksItem } from '@/shared/ui/widgets/CookbooksItem';
import { IconActive } from '@/shared/ui/iconActive';
import { PlusEllipse } from '@/shared/ui/icons';
import type { Food } from '@/types/foods';
import type { Cookbook } from '@/types/users';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

type CookbooksProps = {
  handleClick?: (recipes: Food[], name: string) => void;
  createBook: () => void;
};

export function Cookbooks({ handleClick, createBook }: CookbooksProps) {
  const user = useSelector((state: RootState) => state.user.userData);
  return (
    <div className={styles.cookbooks}>
      {'cookbooks' in user &&
        user.cookbooks.map((item: Cookbook, index: number) => (
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
