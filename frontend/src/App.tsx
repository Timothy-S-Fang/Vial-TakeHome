import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Container from "./Components/Layout/Container";
import { theme } from "./theme";
import Header from "./Components/Layout/Header"
import SubjectTable from "./Components/Table/TableContainer";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        <Header />
        <SubjectTable />
      </Container>
    </MantineProvider>
  );
}
