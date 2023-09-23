import { useEffect, useState } from "react"
import Caption from "../../components/Caption"
import FilterButton from "./components/FilterButton"
import { FilterInput } from "./components/FilterInput"
import MyListings from "../MyListings"
import SelectList from "../../components/ui/SelectList"
import jobType from "../../constants/jobType"
import experienceLevel from "../../constants/experienceLevel"
import { jobListings } from "../../utils/types"
import JobListings from "./components/JobListings"
import Btn from "../../components/ui/Btn"
import useJobListings from "../../contexts/useJobListings"
import NewJobListing from "./components/NewJobListing"

// eslint-disable-next-line react-refresh/only-export-components
function Jobs() {
	const [showHidden, setShowHidden] = useState(false)
	const [showFavorites, setShowFavorites] = useState(false)
	const { jobListings, setJobListings } = useJobListings()
	const [filteredJobListings, setFilteredJobListings] =
		useState<jobListings[]>(jobListings)
	useEffect(() => {
		setFilteredJobListings(jobListings)
	}, [jobListings])
	// TODO: make the new listing page
	return (
		<>
			<Caption
				caption="job listings"
				buttonCaption="create listing"
				to="/jobs/new"
			/>
			<div className="flex flex-wrap justify-center items-center w-full h-fit gap-4 md:py-2 mt-8 px-2 pb-12 md:px-4">
				<FilterInput caption="title" inputType="text" />
				<FilterInput
					className="relative"
					caption="location"
					inputType="text"
				/>
				<FilterInput caption="minimum salary" inputType="number" />
				<FilterInput className="relative" caption="job type" custom>
					<SelectList items={jobType} />
				</FilterInput>
				<FilterInput
					className="relative"
					caption="experience level"
					inputType="text"
					custom
				>
					<SelectList items={experienceLevel} />
				</FilterInput>
				<div className="w-[28rem] h-14 mt-6 flex">
					<div className="flex-1 h-full flex flex-col gap-2">
						<FilterButton
							caption="show hidden"
							enabled={showHidden}
							setEnabled={setShowHidden}
						/>
						<FilterButton
							caption="show favorites only"
							enabled={showFavorites}
							setEnabled={setShowFavorites}
						/>
					</div>
					<div className="flex-1 h-full flex justify-end items-end">
						<Btn>reset</Btn>
					</div>
				</div>
			</div>
			<JobListings
				favorites={showFavorites}
				hidden={showHidden}
				jobListings={filteredJobListings}
				setJobListings={setJobListings}
			/>
		</>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const jobsRouter = {
	path: "/jobs",
	children: [
		{ index: true, element: <Jobs /> },
		{
			path: "my-listings",
			element: <MyListings />,
		},
		{
			path: "new",
			element: <NewJobListing />,
		},
	],
}
