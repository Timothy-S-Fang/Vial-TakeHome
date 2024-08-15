import { FunctionComponent } from "react";
import { Subject } from "../../types/AppTypes";
import { Table } from "@mantine/core";

const TableContent: FunctionComponent<{ data: Subject }> = ({ data }) => {
  const { name, age, gender, diagnosisDate, status, id } = data;
  return (
    <Table.Tr key={id}>
      <Table.Td style={{ textAlign: 'center' }}>{id}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{name}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{age}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{gender}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{diagnosisDate}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}> {status}</Table.Td>
    </Table.Tr>
  );
};

export default TableContent;
