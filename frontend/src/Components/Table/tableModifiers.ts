import { useMemo } from "react";
import { Subject, SortConfig, FilterCriteria } from "../../types/AppTypes";

// modifies data so that it becomes sorted in ascending or descending based on sortConfig
export const useSortedData = (
  data: Subject[] | null,
  sortConfig: SortConfig | null
) => {
  return useMemo(() => {
    if (!data) return [];
    let sortableData = [...data];
    if (sortConfig && sortConfig.direction) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);
};

// modifies data so that it filters out by searchTerm and filterCriteria
export const useFilteredData = (
  data: Subject[],
  searchTerm: string,
  filterCriteria: FilterCriteria
) => {
  return useMemo(() => {
    if (!data) return [];

    return data.filter((subject) => {
      const matchesSearchTerm = Object.values(subject)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesGender = filterCriteria.gender
        ? subject.gender === filterCriteria.gender
        : true;
      const matchesStatus = filterCriteria.status
        ? subject.status === filterCriteria.status
        : true;

      return matchesSearchTerm && matchesGender && matchesStatus;
    });
  }, [data, searchTerm, filterCriteria]);
};

// paginates data by returning only the data for the current page
export const usePaginatedData = (
  data: Subject[],
  activePage: number,
  itemsPerPage: number
) => {
  return useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, activePage, itemsPerPage]);
};
