import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import "mantine-contextmenu/styles.layer.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ContextMenuProvider } from "mantine-contextmenu";

import MdEditor from "./components/Editor/MdEditor";
import TitleBar from "./components/TitleBar/TitleBar";
import InitializeEditor from "./utils/InitializeEditor";
import UseKeybinds from "./utils/Keybinds";

function App() {
  InitializeEditor();
  UseKeybinds();
  return (
    <MantineProvider defaultColorScheme="auto">
      <ContextMenuProvider>
        <Notifications />
        <TitleBar />
        <MdEditor />
      </ContextMenuProvider>
    </MantineProvider>
  );
}

export default App;
