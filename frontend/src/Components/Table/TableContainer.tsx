import { Table, TextInput, Pagination, Center, Select } from "@mantine/core";
import { FunctionComponent, useState, useEffect } from "react";
import { subjectCategories, itemsPerPage } from "../../Constants/data";
import { FaSearch, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { fetchData } from "../../API/fetchData";
import { Subject, SortConfig, FilterCriteria } from "../../types/AppTypes";
import {
  useSortedData,
  useFilteredData,
  usePaginatedData,
} from "./tableModifiers";
import TableContent from "./TableContent";

const TableContainer: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<Subject[] | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    gender: null,
    status: null,
  });

  useEffect(() => {
    // To reset back to page one after searching
    setActivePage(1);
  }, [searchTerm, filterCriteria]);

  useEffect(() => {
    // initial load of data from api
    const retrieveData = async () => {
      try {
        const retrievedData = await fetchData();
        setData(retrievedData);
      } catch (error) {
        setErrorState(true);
      }
    };
    retrieveData();
  }, []);

  // All data manipulation functions in ./tableModifiers for simplicity
  const sortedData = useSortedData(data, sortConfig);
  const filteredData = useFilteredData(sortedData, searchTerm, filterCriteria);
  const paginatedData = usePaginatedData(
    filteredData,
    activePage,
    itemsPerPage
  );

  // handling for sorting from header click
  const handleSort = (key: keyof Subject) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "ascending") {
        setSortConfig({ key, direction: "descending" });
      } else if (sortConfig.direction === "descending") {
        setSortConfig(null);
      } else {
        setSortConfig({ key, direction: "ascending" });
      }
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  // handling for filters and searching
  const handleFilterChange = (
    key: keyof FilterCriteria,
    value: string | null
  ) => {
    setFilterCriteria((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const FilterComponent = () => {
    return (
      <Center>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Select
            placeholder="Filter by Gender"
            data={["Male", "Female"]}
            value={filterCriteria.gender}
            onChange={(value) => handleFilterChange("gender", value)}
          />
          <Select
            placeholder="Filter by Status"
            data={["Stable", "Critical", "Discharged"]}
            value={filterCriteria.status}
            onChange={(value) => handleFilterChange("status", value)}
          />
        </div>
      </Center>
    );
  };

  const SubjectTable = () => {
    return (
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <thead>
          <tr>
            {subjectCategories.map((subject, index) => (
              <th key={index} onClick={() => handleSort(subject.key)}>
                {`${subject.label} `}
                {sortConfig?.key === subject.key &&
                  (sortConfig.direction === "ascending" ? (
                    <FaChevronUp size={10} />
                  ) : (
                    <FaChevronDown size={10} />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <Table.Tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((subject) => (
              <TableContent key={subject.id} data={subject} />
            ))
          ) : (
            <tr>
              <td colSpan={subjectCategories.length}>No data available</td>
            </tr>
          )}
        </Table.Tbody>
      </Table>
    );
  };
  // Display when backend throws error
  if (errorState)
    return (
      <div>
        Oh no! We are having trouble loading the data from the backend! Come
        back another time while we get this fixed...
      </div>
    );

  return (
    <div>
      <TextInput
        placeholder="Type to Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        mb="md"
        leftSection={<FaSearch size="1rem" color="black" />}
      />
      <FilterComponent />
      <SubjectTable />
      {filteredData.length > itemsPerPage && (
        <Center>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={Math.ceil(filteredData.length / itemsPerPage)}
            mt="md"
          />
        </Center>
      )}
    </div>
  );
};

export default TableContainer;
