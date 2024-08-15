import { Table, TextInput, Pagination, Center } from "@mantine/core";
import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { subjectCategories, itemsPerPage } from "../../Constants/data";
import { FaSearch, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { fetchData } from "../../API/fetchData";
import { Subject, SortConfig } from "../../types/AppTypes";
import TableContent from "./TableContent";

const TableContainer: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<Subject[] | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  useEffect(() => {
    setActivePage(1);
  }, [searchTerm]);

  useEffect(() => {
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

  const sortedData = useMemo(() => {
    let sortableData = [...(data || [])];
    if (sortConfig !== null && sortConfig.direction !== null) {
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

  const filteredData = useMemo(() => {
    if (!sortedData) return [];
    return sortedData.filter((subject) =>
      Object.values(subject)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [sortedData, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, activePage]);

  const handleSort = (key: keyof Subject) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "ascending") {
        setSortConfig({ key, direction: "descending" });
      } else if (sortConfig.direction === "descending") {
        setSortConfig(null); // Turn off sorting
      } else {
        setSortConfig({ key, direction: "ascending" });
      }
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  return (
    <div>
      <TextInput
        placeholder="Type to Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        mb="md"
        leftSection={<FaSearch size="1rem" color="black" />}
      />
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
                    <FaChevronUp size={10}/>
                  ) : (
                    <FaChevronDown size={10}/>
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
