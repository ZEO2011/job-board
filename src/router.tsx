import { Navigate, RouteObject } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Jobs from "./pages/jobs/Jobs"
import Tasks from "./pages/tasks/Tasks"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import MyListings from "./pages/MyListings"

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
						path: "/jobs",
						children: [
							{ index: true, element: <Jobs /> },
							{
								path: "my-listings",
								element: <MyListings />,
							},
						],
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
