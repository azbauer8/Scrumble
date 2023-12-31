import {
  FolderOpenIcon,
  MenuIcon,
  PlusCircleIcon,
  SaveIcon,
  SaveAllIcon,
  SettingsIcon,
  InfoIcon,
  CommandIcon,
} from "lucide-react";
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
import { New, Open, Save, SaveAs, OpenDirectory } from "../../utils/fileOps";
import useUIState from "@/store/ui";

export default function FileMenu({
  buttonClassName,
  dropdownClassName,
}: {
  buttonClassName?: string;
  dropdownClassName?: string;
}) {
  const { setAboutOpen, setSettingsOpen, setCommandMenuOpen } = useUIState();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus-visible:ring-0">
          <Button
            variant="ghost"
            className={`focus-visible:ring-transparent focus:ring-transparent absolute top-0.5 ${buttonClassName}`}
            tabIndex={-1}
          >
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-64 bg-background -translate-y-0.5 ${dropdownClassName}`}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => OpenDirectory()}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>Open folder</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => New()}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>New</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => Open()}>
              <FolderOpenIcon className="mr-2 h-4 w-4" />
              <span>Open</span>
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
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
