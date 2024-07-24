import React from "react"
import ReactDOM from "react-dom/client"

import App from "./app"
import {ScrollContext} from "./app/providers/ScrollContext"
import "./index.css"
import {CanvasLayout} from "./layout/CanvasLayout/CanvasLayout"
import {ScrollLayout} from "./layout/ScrollLayout/ScrollLayout"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScrollLayout>
      <CanvasLayout>
        <App />
      </CanvasLayout>
    </ScrollLayout>
  </React.StrictMode>,
)
