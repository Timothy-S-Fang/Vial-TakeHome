import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from "@mantine/core";
import React, { FunctionComponent, useState, useEffect } from "react";
import { subjectCategories } from "../../Constants/data";
import { FaSearch } from "react-icons/fa";
import { fetchData } from "../../API/fetchData";
import { Subject } from "../../types/AppTypes";
import TableContent from "./TableContent";

const TableContainer: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<Subject[] | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);

  useEffect(() => {
    // searchTerm has changed
  }, [searchTerm]);

  useEffect(() => {
    const retreiveData = async () => {
      try {
        const retreivedData = await fetchData();
        console.log(retreivedData)
        setData(retreivedData);
      } catch (error) {
        setErrorState(true);
      }
    };
    retreiveData();
  });

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
              <th key={index}>{subject}</th>
            ))}
          </tr>
        </thead>
        <Table.Tbody>
          {data ? data.map(subject => (<TableContent key={subject.id} data={subject} />)) : <div>No data available</div>}
          </Table.Tbody>
      </Table>
    </div>
  );
};

export default TableContainer;
