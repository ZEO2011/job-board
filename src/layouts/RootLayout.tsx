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
		[
			{
				id: crypto.randomUUID(),
				title: "senior web developer",
				companyName: "netflix",
				location: "remote",
				salary: 2000,
				date: `${new Date()}`,
				description:
					"We are looking for a dedicated senior web developer",
				experience: "senior",
				favorite: false,
				hidden: false,
				fullDescription: `
				# Great Paying Job
				---
				This job pays great and has great benefits
				## Benefits
				- great pay
				- great benefits
				- great coworkers
				`,
				time: "full time",
				website: "https://netflix.com",
				user: false,
			},
			{
				id: crypto.randomUUID(),
				title: "Backend Developer",
				companyName: "netflix",
				location: "remote",
				salary: 125000,
				date: `${new Date()}`,
				description:
					"We are looking for a backend developer to work part time",
				experience: "mid-level",
				favorite: false,
				hidden: false,
				fullDescription: "react 3mk",
				time: "part time",
				website: "https://netflix.com",
				user: false,
			},
			{
				id: crypto.randomUUID(),
				title: "Frontend Developer",
				companyName: "netflix",
				location: "egypt",
				salary: 75000,
				date: `${new Date()}`,
				description:
					"We are looking for an intern to work part time",
				experience: "junior",
				favorite: false,
				hidden: false,
				fullDescription: "react 3mk & svelte bent 3mk",
				time: "internship",
				website: "https://netflix.com",
				user: false,
			},
		],
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
