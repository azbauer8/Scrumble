import {
  FolderOpenIcon,
  PlusCircleIcon,
  SaveIcon,
  SaveAllIcon,
  SettingsIcon,
  InfoIcon,
  HeadingIcon,
  ListIcon,
  ListOrderedIcon,
  TextQuoteIcon,
  Code2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  TerminalIcon,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import useUIState from "@/store/ui";
import { useEffect, useState } from "react";
import { useCommandState } from "cmdk";
import useFileState from "@/store/file";
import { langs } from "../Editor/langs";
import { New, Open, Save, SaveAs } from "@/utils/fileOps";

export default function CommandMenu() {
  const {
    isCommandMenuOpen,
    setCommandMenuOpen,
    setSettingsOpen,
    setAboutOpen,
  } = useUIState();
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState([] as string[]);
  const page = pages[pages.length - 1];
  const { editorRef } = useFileState();

  useEffect(() => {
    setPages([]);
    setSearch("");
  }, [isCommandMenuOpen]);

  console.log(search);

  return (
    <CommandDialog
      open={isCommandMenuOpen}
      onOpenChange={setCommandMenuOpen}
      loop
      onKeyDown={(e) => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
          e.preventDefault();
          if (pages.length > 0) {
            setPages((pages) => pages.slice(0, -1));
            setSearch("");
          } else {
            setCommandMenuOpen(false);
          }
        }
      }}
    >
      <CommandInput
        placeholder="Search for a command..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {!page && (
          <CommandItem
            onSelect={() => {
              setPages([...pages, "heading"]);
              setSearch("");
            }}
          >
            <HeadingIcon className="mr-2" />
            <span>Heading</span>
            <CommandShortcut>#</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 1 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading1Icon className="mr-2" />
            <span>Heading 1</span>
            <CommandShortcut>#</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 2 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading2Icon className="mr-2" />
            <span>Heading 2</span>
            <CommandShortcut>##</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 3 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading3Icon className="mr-2" />
            <span>Heading 3</span>
            <CommandShortcut>###</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 4 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading4Icon className="mr-2" />
            <span>Heading 4</span>
            <CommandShortcut>####</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 5 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading5Icon className="mr-2" />
            <span>Heading 5</span>
            <CommandShortcut>#####</CommandShortcut>
          </CommandItem>
        )}
        {(search || page === "heading") && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleHeading({ level: 6 });
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <Heading6Icon className="mr-2" />
            <span>Heading 6</span>
            <CommandShortcut>######</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleBulletList();
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <ListIcon className="mr-2" />
            <span>Bullet List</span>
            <CommandShortcut>{"-"}</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleOrderedList();
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <ListOrderedIcon className="mr-2" />
            <span>Ordered List</span>
            <CommandShortcut>1.</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleBlockquote();
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <TextQuoteIcon className="mr-2" />
            <span>Block Quote</span>
            <CommandShortcut>{">"}</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              setPages([...pages, "code-block"]);
              setSearch("");
            }}
          >
            <Code2Icon className="mr-2" />
            <span>Code Block</span>
            <CommandShortcut>{"```"}</CommandShortcut>
          </CommandItem>
        )}
        {page === "code-block" && (
          <CommandItem
            onSelect={() => {
              editorRef?.commands.toggleCodeBlock();
              editorRef?.commands.focus();
              setCommandMenuOpen(false);
            }}
          >
            <TerminalIcon className="mr-2" />
            <span>plain text</span>
          </CommandItem>
        )}
        {page === "code-block" &&
          langs.map((lang) => {
            return (
              <CommandItem
                key={lang.displayName}
                onSelect={() => {
                  editorRef?.commands.toggleCodeBlock({
                    language: lang.displayName,
                  });
                  editorRef?.commands.focus();
                  setCommandMenuOpen(false);
                }}
              >
                <TerminalIcon className="mr-2" />
                <span>{lang.displayName}</span>
              </CommandItem>
            );
          })}
        {!search && !page && <CommandSeparator />}
        {!page && (
          <CommandItem
            onSelect={() => {
              New();
              setCommandMenuOpen(false);
            }}
          >
            <PlusCircleIcon className="mr-2" />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              Open();
              setCommandMenuOpen(false);
            }}
          >
            <FolderOpenIcon className="mr-2" />
            <span>Open File</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              Save();
              setCommandMenuOpen(false);
            }}
          >
            <SaveIcon className="mr-2" />
            <span>Save File</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              SaveAs();
              setCommandMenuOpen(false);
            }}
          >
            <SaveAllIcon className="mr-2" />
            <span>Save File As</span>
            <CommandShortcut>⇧⌘S</CommandShortcut>
          </CommandItem>
        )}
        {!search && !page && <CommandSeparator />}

        {!page && (
          <CommandItem
            onSelect={() => {
              setSettingsOpen(true);
              setCommandMenuOpen(false);
            }}
          >
            <SettingsIcon className="mr-2" />
            <span>Settings</span>
          </CommandItem>
        )}
        {!page && (
          <CommandItem
            onSelect={() => {
              setAboutOpen(true);
              setCommandMenuOpen(false);
            }}
          >
            <InfoIcon className="mr-2" />
            <span>About</span>
          </CommandItem>
        )}
      </CommandList>
    </CommandDialog>
  );
}
