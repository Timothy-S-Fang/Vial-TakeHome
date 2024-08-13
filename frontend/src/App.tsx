import "@mantine/core/styles.css";
import { AppShell, MantineProvider, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { theme } from "./theme";
import { Header } from "./Components/Header"
import SubjectTable from "./Components/SubjectTable";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <MantineProvider theme={theme}>
      <Header />
      <SubjectTable />
    </MantineProvider>
  );
}
