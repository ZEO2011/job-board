import { Navigate, RouteObject } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import { jobsRouter } from "./pages/jobs/Jobs"
import Tasks from "./pages/tasks/Tasks"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"

export const router: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Navigate to={"/jobs"} />,
					},
					{
						...jobsRouter,
					},
					{
						path: "/tasks",
						element: <Tasks />,
					},
					{
						path: "/login",
						element: <Login />,
					},
				],
			},
		],
	},
]
