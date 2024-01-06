import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUIState from "@/store/ui";
import { New, Open, OpenFolder, Save, SaveAs } from "@/utils/fileOps";
import {
  CommandIcon,
  FileIcon,
  FolderOpenIcon,
  InfoIcon,
  MenuIcon,
  PanelLeftIcon,
  PlusCircleIcon,
  SaveAllIcon,
  SaveIcon,
  SettingsIcon,
} from "lucide-react";

export default function FileMenu({
  buttonClassName,
  dropdownClassName,
}: {
  buttonClassName?: string;
  dropdownClassName?: string;
}) {
  const {
    setAboutOpen,
    setSettingsOpen,
    setCommandMenuOpen,
    isSidebarOpen,
    setSidebarOpen,
    sidebarRef,
  } = useUIState();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus-visible:ring-0">
          <Button
            variant="ghost"
            className={`absolute top-0.5 focus:ring-transparent focus-visible:ring-transparent ${buttonClassName}`}
            tabIndex={-1}
          >
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-64 -translate-y-0.5 bg-background ${dropdownClassName}`}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => New()}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>New</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => Open()}>
              <FileIcon className="mr-2 h-4 w-4" />
              <span>Open</span>
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => OpenFolder()}>
              <FolderOpenIcon className="mr-2 h-4 w-4" />
              <span>Open folder</span>
              <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => Save()}>
              <SaveIcon className="mr-2 h-4 w-4" />
              <span>Save</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => SaveAs()}>
              <SaveAllIcon className="mr-2 h-4 w-4" />
              <span>Save As</span>
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                isSidebarOpen ? sidebarRef?.collapse() : sidebarRef?.expand();
                setSidebarOpen(!isSidebarOpen);
              }}
            >
              <PanelLeftIcon className="mr-2 h-4 w-4" />
              <span>Toggle Sidebar</span>
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCommandMenuOpen(true)}>
              <CommandIcon className="mr-2 h-4 w-4" />
              <span>Open Command Menu</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAboutOpen(true)}>
              <InfoIcon className="mr-2 h-4 w-4" />
              <span>About</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
