type FilterItem = {
  name: string;
  id: string;
};

type FilterGroup = {
  title: string;
  items: FilterItem[];
};

export interface Filters {
  filtersGroup: FilterGroup[];
}
