import styles from './SearchBar.module.css';
import { SearchIcon } from '@/shared/ui/icons';

type SearchBarProps = {
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: string) => void;
};

export function SearchBar({ placeholder, className, value, onChange }: SearchBarProps) {
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.searchBar__form} ${className}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          placeholder={placeholder}
        />
        <SearchIcon className={styles.searchIcon} />
      </form>
    </>
  );
}
