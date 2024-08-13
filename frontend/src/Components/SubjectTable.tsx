import { Table } from "@mantine/core";
import react, { useEffect, useState } from "react";
import { fetchSubjectData } from "../Services/subject";
import { Subject } from "../types/SubjectDataType";
import styles from "./SubjectTable.module.css";

const SubjectTable = () => {
  const [subjectData, setSubjectData] = useState<Subject[] | null>(null);
  const [subjectError, setSubjectError] = useState<boolean>(false);

  useEffect(() => {
    getSubjectData();
  }, []);

  const getSubjectData = async () => {
    try {
      const data = await fetchSubjectData();
      console.log(data);
      setSubjectData(data);
    } catch (error) {
      setSubjectError(true);
    }
  };
  const rows = subjectData
    ? subjectData.map((person) => (
        <Table.Tr>
          <Table.Td>{person.name}</Table.Td>
          <Table.Td>{person.age}</Table.Td>
          <Table.Td>{person.gender}</Table.Td>
          <Table.Td>{person.diagnosis}</Table.Td>
          <Table.Td>{person.diagnosisDate}</Table.Td>
        </Table.Tr>
      ))
    : null;
  return (
    <div className={styles.parentContainer}>
      <Table>
        <Table.Thead>
          <Table.Th>Name</Table.Th>
          <Table.Th>Age</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Diagnosis</Table.Th>
          <Table.Th>Diagnosis Date</Table.Th>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};
export default SubjectTable;
