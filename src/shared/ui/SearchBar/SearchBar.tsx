import styles from './SearchBar.module.css';
import { SearchIcon } from '@/shared/ui/icons';

type SearchBarProps = {
  placeholder: string;
  className?: string;
};

export function SearchBar({ placeholder, className }: SearchBarProps) {
  // Затычка и onChange тоже
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.searchBar__form} ${className}`}>
        <input type="text" value="" onChange={() => {}} placeholder={placeholder} />
        <SearchIcon className={styles.searchIcon} />
      </form>
    </>
  );
}
