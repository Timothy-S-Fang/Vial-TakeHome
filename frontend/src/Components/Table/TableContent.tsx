import { FunctionComponent } from "react";
import { Subject } from "../../types/AppTypes";
import { Table } from "@mantine/core";

const TableContent: FunctionComponent<{ data: Subject }> = ({ data }) => {
  const { name, age, gender, diagnosisDate, status, id } = data;
  return (
    <Table.Tr key={id}>
        <Table.Td>{id}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{age}</Table.Td>
      <Table.Td>{gender}</Table.Td>
      <Table.Td>{diagnosisDate}</Table.Td>
      <Table.Td>{status}</Table.Td>
    </Table.Tr>
  );
};

export default TableContent;
