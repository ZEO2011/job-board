import { Navigate, RouteObject } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import { jobsRouter } from "./pages/jobs/Jobs"
import Tasks from "./pages/tasks/Tasks"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import NewTask from "./pages/NewTask"
import EditTask from "./pages/EditTask"

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
						children: [
							{ index: true, element: <Tasks /> },
							{
								path: ":taskId",
								children: [
									{
										index: true,
										element: (
											<Navigate to={"edit"} />
										),
									},
									{
										path: "edit",
										element: <EditTask />,
										loader: ({
											params: { taskId },
										}) => {
											return taskId ?? ""
										},
									},
								],
							},
							{ path: "new", element: <NewTask /> },
						],
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
