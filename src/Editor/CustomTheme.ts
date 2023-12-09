import { darkDefaultTheme, Theme } from "@blocknote/react";
import "@blocknote/core/style.css";

const customTheme = {
  ...darkDefaultTheme,
  componentStyles: () => ({
    Editor: {
      ".bn-image-block-content-wrapper": {},
      ".bn-add-image-button": {},
      ".bn-add-image-button-text": {},
      ".bn-add-image-button-icon": {},
    },
    Menu: {
      overflow: "auto",
    },
  }),
} satisfies Theme;

export default customTheme;
