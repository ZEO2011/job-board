import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import { Dispatch, SetStateAction, createContext } from "react"
import { useLocalStorage } from "usehooks-ts"
import { jobListings, task } from "../utils/types"

type emailType = {
	email: string
	password: string
}

type loginContextType = {
	loginData: emailType
	setLoginData: Dispatch<SetStateAction<emailType>>
}

type JobListingsContextType = {
	jobListings: jobListings[]
	setJobListings: Dispatch<SetStateAction<jobListings[]>>
}

export const LoginContext = createContext<loginContextType | null>(null)
export const JobListingsContext = createContext<JobListingsContextType | null>(
	null,
)

type taskContextType = {
	tasks: task[]
	setTasks: Dispatch<SetStateAction<task[]>>
}

export const TasksContext = createContext<taskContextType | null>(null)

export default function RootLayout() {
	const [loginData, setLoginData] = useLocalStorage("signingData", {
		email: "",
		password: "",
	})
	const [jobListings, setJobListings] = useLocalStorage<jobListings[]>(
		"job listings",
		[],
	)
	const [tasks, setTasks] = useLocalStorage<task[]>("tasks", [
		{
			id: crypto.randomUUID(),
			title: "meet the boss",
			status: "done",
			priority: "high",
			category: "work",
		},
		{
			id: crypto.randomUUID(),
			title: "learn redux",
			status: "in progress",
			priority: "high",
			category: "work",
		},
		{
			id: crypto.randomUUID(),
			title: "learn python",
			status: "todo",
			priority: "low",
			category: "personal",
		},
	])
	return (
		<>
			<JobListingsContext.Provider
				value={{ jobListings, setJobListings }}
			>
				<LoginContext.Provider value={{ loginData, setLoginData }}>
					<Header />
					<TasksContext.Provider value={{ tasks, setTasks }}>
						<Outlet />
					</TasksContext.Provider>
				</LoginContext.Provider>
			</JobListingsContext.Provider>
		</>
	)
}
