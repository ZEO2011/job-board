import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { router } from "./router"
import "./assets/styles/style.css"
import "./assets/styles/normalize.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={createBrowserRouter(router)} />
	</React.StrictMode>,
)
