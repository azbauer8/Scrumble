import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import MdEditor from "./components/Editor/MdEditor";
import TitleBar from "./components/TitleBar/TitleBar";
import InitializeEditor from "./hooks/initializeEditor";

function App() {
  InitializeEditor();

  return (
    <MantineProvider defaultColorScheme="auto">
      <Notifications />
      <TitleBar />
      <MdEditor />
    </MantineProvider>
  );
}

export default App;
