import { RefObject } from "react";
import { Editor } from "@milkdown/core";
import { useAtom } from "jotai";
import { userSettingsState } from "../../globalState/settings";
import {
  fileContentState,
} from "../../globalState/file";
import {
  isTwoColumnState,
} from "../../globalState/ui";
import FindAndReplace from "./FindAndReplace";
import MdEditor from "./MdEditor";


type EditorWrapperProps = {
  editorInstance: RefObject<Editor>;
};


export default function EditorWrapper({ editorInstance }: EditorWrapperProps) {
  const [fileContent, setFileContent] = useAtom(fileContentState);
  const [isTwoColumn] = useAtom(isTwoColumnState);
  const [userSettings] = useAtom(userSettingsState);

  return (
    <div className="editor-container" spellCheck={false}>
      <MdEditor
        useMenu={false}
        content={fileContent}
        onMarkdownUpdated={(markdown) => {
          setFileContent(markdown);
        }}
        twoColumnEditor={isTwoColumn}
        syntaxOption={userSettings.syntax}
        ref={editorInstance}
      />
      <FindAndReplace editorInstance={editorInstance} />
    </div>
  )
}