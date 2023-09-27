import { Dispatch, ReactNode, SetStateAction, useId } from "react"
import JobListing from "./JobListing"
import { jobListings } from "../../../utils/types"

type JobListingsType = {
	jobListings: jobListings[]
	setJobListings: Dispatch<SetStateAction<jobListings[]>>
	hidden?: boolean
	favorites?: boolean
	setDate?: boolean
	children?: ReactNode
}

export default function JobListings({
	jobListings,
	setJobListings,
	hidden,
	favorites,
	setDate,
	children,
}: JobListingsType) {
	const id = useId()
	const filtered = jobListings
		.filter((el) => {
			if (favorites) return el.favorite
			return el
		})
		.map((job: jobListings) => (
			<JobListing
				setJobListings={setJobListings}
				key={`${id}-${job.id}`}
				{...job}
			/>
		))

	const notHidden = jobListings
		.filter((el) => {
			if (favorites) return el.favorite
			return el
		})
		.filter((el) => !el.hidden)
		.map((job: jobListings) => (
			<JobListing
				setDate={setDate}
				setJobListings={setJobListings}
				key={`${id}-${job.id}`}
				{...job}
			>
				{children}
			</JobListing>
		))

	return (
		<div className="w-full h-fit flex gap-6 flex-wrap justify-center items-center p-4 py-6 pt-12">
			{hidden ? filtered : notHidden}
		</div>
	)
}
