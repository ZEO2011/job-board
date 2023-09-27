export type jobListings = {
	id: string
	title: string
	companyName: string
	location: string
	salary: number
	time: JobTypeType["name"]
	experience: experienceType["name"]
	description: string
	fullDescription: string
	hidden: boolean
	favorite: boolean
	date: string
	website: string
	user: boolean
}

export type task = {
	id: string
	title: string
	status: "todo" | "in progress" | "done"
	priority: "low" | "medium" | "high"
	category: "work" | "personal"
}

export type JobTypeType = {
	id: number
	name: jobListings["time"]
}

export type experienceType = {
	id: number
	name: jobListings["experience"]
}

export type extendDaysType = {
	id: number
	days: number
	salary: number
	name: string
}
