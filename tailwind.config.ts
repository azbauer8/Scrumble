import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: { preflight: false },
}

export default config
