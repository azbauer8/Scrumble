# Scrumble

A simple Markdown editor powered by TipTap

## Features

- Clean, minimal design using Mantine UI
- Very fast and low utilization
- WYSIWYG markdown with standard syntax and shortcuts
- Available for Windows and MacOS
  - Should work fine on Linux, I just haven't spun up a vm to bundle it myself yet
- Fully open-source

## Roadmap

- Adding tables and better support for links and images
- Adding slash menu to insert blocks
- Moving menu button to menu bar on MacOS
- Proper indent functionality
- Drag and drop functionality for images and links
- Add "Open folder" functionality with sidebar to switch between files in folder
- Add setting to open default folder on launch
- Native md file association
- Format raw md text on paste
- Spell check setting

## Wishlist:

- Tabs & multiple windows
- Command palette to search directory
- Remap keybindings

# Building it yourself

Must have NodeJS and any dependencies to run Tauri

```Auto
# clone repo
gh repo clone azbauer8/Scrumble
# install
npm install
# run in dev
npm run tauri dev
# build app
npm run tauri build
```