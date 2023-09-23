import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import { Dispatch, SetStateAction, createContext } from "react"
import { useLocalStorage } from "usehooks-ts"
import { jobListings } from "../utils/types"

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
				category: "remote",
				salary: 2000,
				date: new Date(),
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
				category: "remote",
				salary: 125000,
				date: new Date(),
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
				category: "egypt",
				salary: 75000,
				date: new Date(),
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
	return (
		<>
			<LoginContext.Provider value={{ loginData, setLoginData }}>
				<Header />
				<JobListingsContext.Provider
					value={{ jobListings, setJobListings }}
				>
					<Outlet />
				</JobListingsContext.Provider>
			</LoginContext.Provider>
		</>
	)
}
