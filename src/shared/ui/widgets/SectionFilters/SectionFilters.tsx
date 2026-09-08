import { RadioGroup } from '@/shared/ui/radioGroup';
import styles from './SectionFilters.module.css';
import { DefaultButton } from '../../buttons/defaultButton';
import { useState } from 'react';
import { ArrowFilterIcon } from '../../icons';
import { IconActive } from '../../iconActive';
import type { Filters } from '@/types/filters';

export function SectionFilters({ filtersGroup }: Filters) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [showAllFilters, setShowAllFilters] = useState<Record<string, boolean>>({});
  const [collapsedFieldsets, setCollapsedFieldsets] = useState<Record<string, boolean>>({});

  const handleRadioChange = (groupName: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [groupName]: value,
    }));
  };
  const handleToggleAll = (groupName: string) => {
    setShowAllFilters((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };
  const handleToggleFieldset = (groupName: string) => {
    setCollapsedFieldsets((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const hasNoSelections = Object.keys(selectedValues).length === 0;
  return (
    <div className={styles.sectionFilters}>
      <h3 className={styles.sectionFilters__heading} id="filters-title">
        Дополнительные фильтры
      </h3>
      <form
        className={styles.sectionFilters__form}
        aria-labelledby="filters-title"
        aria-label="Дополнительные фильтры">
        {filtersGroup.map((filters, index) => {
          const lenght = filters.items.length > 5;
          const showAll = showAllFilters[filters.title] || false;
          const isFieldsetCollapsed = collapsedFieldsets[filters.title] || false;
          return (
            <fieldset
              key={index}
              className={`${styles.sectionFilters__form__fieldset} ${isFieldsetCollapsed ? styles.fieldset : ''}`}>
              <IconActive
                className={`${styles.sectionFilters__form__fieldset__icon} ${isFieldsetCollapsed ? styles.rotated : ''}`}
                svg={<ArrowFilterIcon />}
                handleClick={(e) => {
                  e.preventDefault();
                  handleToggleFieldset(filters.title);
                }}
              />
              <legend className={styles.sectionFilters__form__fieldset__legend}>
                {filters.title}
              </legend>
              <div
                className={`${styles.collapsibleContent} ${isFieldsetCollapsed ? styles.expanded : ''}`}>
                {filters.items.map((filter, index) => {
                  const isVisible = showAll || index < 5;
                  return (
                    <div
                      key={index}
                      className={`${styles.collapsibleItem} ${isVisible ? styles.visible : ''}`}>
                      <RadioGroup
                        classNameLabel={styles.classNameLabel}
                        key={filter.id}
                        name={filters.title}
                        id={filter.id}
                        value={filter.name}
                        label={filter.name}
                        checked={(selectedValues[filters.title] || '') === filter.name}
                        onChange={() => handleRadioChange(filters.title, filter.name)}
                      />
                    </div>
                  );
                })}

                {lenght && (
                  <DefaultButton
                    type="button"
                    className={styles.sectionFilters__form__fieldset__button}
                    text={showAll ? 'Скрыть' : 'Смотреть все'}
                    handleClick={() => handleToggleAll(filters.title)}
                  />
                )}
              </div>
            </fieldset>
          );
        })}
        <DefaultButton
          disabled={hasNoSelections}
          className={styles.sectionFilters__form__button}
          text={'Применить'}
        />
      </form>
    </div>
  );
}
