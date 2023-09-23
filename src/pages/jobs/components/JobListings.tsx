import { Dispatch, SetStateAction } from "react"
import JobListing from "./JobListing"
import { jobListings } from "../../../utils/types"

type JobListingsType = {
	jobListings: jobListings[]
	setJobListings: Dispatch<SetStateAction<jobListings[]>>
	hidden: boolean
	favorites: boolean
}
export default function JobListings({
	jobListings,
	setJobListings,
	hidden,
	favorites,
}: JobListingsType) {
	const filtered = jobListings
		.filter((el) => {
			if (favorites) return el.favorite
			return el
		})
		.map((job: jobListings) => {
			return (
				<JobListing
					setJobListings={setJobListings}
					key={job.id}
					{...job}
				/>
			)
		})
	const notHidden = jobListings
		.filter((el) => {
			if (favorites) return el.favorite
			return el
		})
		.filter((el) => !el.hidden)
		.map((job: jobListings) => {
			return (
				<JobListing
					setJobListings={setJobListings}
					key={job.id}
					{...job}
				/>
			)
		})
	return (
		<div className="w-full h-fit flex gap-6 flex-wrap justify-center items-center p-4 py-6 pt-12">
			{hidden ? filtered : notHidden}
		</div>
	)
}
