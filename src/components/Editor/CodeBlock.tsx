import { Select } from "@mantine/core";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

interface CodeBlockProps {
  updateAttributes: (attributes: { language: string }) => void;
  extension: any;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  updateAttributes,
  extension,
}) => {
  const langs = extension.options.lowlight.listLanguages();
  langs.unshift("Auto");

  return (
    <NodeViewWrapper className="code-block">
      <Select
        data={langs}
        defaultValue="Auto"
        onChange={(value) => updateAttributes({ language: value as string })}
        className="code-lang-select"
      />
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
export default CodeBlock;
