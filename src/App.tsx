import Editor from "./components/Editor/Editor";
import MenuListener from "./utils/menuListener";

function App() {
  MenuListener();
  return <Editor />;
}

export default App;
