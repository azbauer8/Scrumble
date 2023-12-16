import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import MdEditor from "./components/Editor/MdEditor";
import TitleBar from "./components/TitleBar/TitleBar";

function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <TitleBar />
      <MdEditor />
    </MantineProvider>
  );
}

export default App;
