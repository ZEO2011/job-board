export type jobListings = {
	id: string
	title: string
	companyName: string
	category: string
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

export type JobTypeType = {
	id: number
	name: "any" | "full time" | "part time" | "internship"
}

export type experienceType = {
	id: number
	name: "any" | "junior" | "mid-level" | "senior"
}

export type extendDaysType = {
	id: number
	days: number
	salary: number
	name: string
}
