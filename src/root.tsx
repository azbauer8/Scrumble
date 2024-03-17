import "@/styles/global.css"
import AppLayout from "@app/Layout/AppLayout"
import Providers from "@app/Layout/Providers"
import "@mantine/core/styles.layer.css"
import "@mantine/notifications/styles.css"
import "mantine-contextmenu/styles.layer.css"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <AppLayout />
  </Providers>,
)
