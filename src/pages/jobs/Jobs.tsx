import { useEffect, useState } from "react"
import Caption from "../../components/Caption"
import { Input } from "../../components/ui/Input"
import MyListingRoute from "../myListings/MyListings"
import SelectList from "../../components/ui/SelectList"
import jobType from "../../constants/jobType"
import experienceLevel from "../../constants/experienceLevel"
import { jobListings } from "../../utils/types"
import JobListings from "./components/JobListings"
import Btn from "../../components/ui/Btn"
import useJobListings from "../../contexts/useJobListings"
import NewJobListing from "./components/NewJobListing"
import OrderCompleted from "../OrderCompleted"
import { Navigate, RouteObject } from "react-router-dom"
import FilterButton from "./components/FilterButton"
import EditJobListingRoute from "../EditJobListing"

// eslint-disable-next-line react-refresh/only-export-components
function Jobs() {
	const [showHidden, setShowHidden] = useState(false)
	const [showFavorites, setShowFavorites] = useState(false)
	const { jobListings, setJobListings } = useJobListings()
	const [filteredJobListings, setFilteredJobListings] =
		useState<jobListings[]>(jobListings)
	const [titleValue, setTitleValue] = useState("")
	const [locationValue, setLocationValue] = useState("")
	const [minSalaryValue, setMinSalaryValue] = useState("")
	const [jobTypeValue, setJobTypeValue] = useState("")
	function getJobTypeValue(name: string) {
		setJobTypeValue(name)
	}
	const [experienceValue, setExperienceValue] = useState("")
	function getExperienceValue(name: string) {
		setExperienceValue(name)
	}
	function filterKeyUp() {
		setFilteredJobListings(
			jobListings
				.filter((el) => {
					return el.title
						.toLowerCase()
						.includes(titleValue.toLowerCase())
				})
				.filter((el) => {
					return el.category
						.toLowerCase()
						.includes(locationValue.toLowerCase())
				})
				.filter((el) => {
					return el.salary >= +minSalaryValue
				})
				.filter((el) => {
					if (jobTypeValue === "any") return el
					return el.time
						.toLowerCase()
						.includes(jobTypeValue.toLowerCase())
				})
				.filter((el) => {
					if (experienceValue === "any") return el
					return el.experience
						.toLowerCase()
						.includes(experienceValue.toLowerCase())
				}),
		)
	}
	useEffect(() => {
		setFilteredJobListings(jobListings)
	}, [jobListings])
	function resetHandler() {
		setTitleValue("")
		setLocationValue("")
		setMinSalaryValue("")
		setShowHidden(false)
		setShowFavorites(false)
		setFilteredJobListings(jobListings)
	}
	return (
		<>
			<Caption
				className="md:p-0 pl-0"
				caption="job listings"
				buttonCaption="create listing"
				to="/jobs/new"
			/>
			<div className="flex flex-wrap justify-center items-center w-full h-fit gap-4 md:py-2 mt-8 px-4 pb-12">
				<Input
					caption="title"
					inputType="text"
					inputValue={titleValue}
					onKeyUp={filterKeyUp}
					setInputValue={setTitleValue}
				/>
				<Input
					inputValue={locationValue}
					setInputValue={setLocationValue}
					onKeyUp={filterKeyUp}
					className="relative"
					caption="location"
					inputType="text"
				/>
				<Input
					caption="minimum salary"
					inputType="number"
					setInputValue={setMinSalaryValue}
					onKeyUp={filterKeyUp}
					inputValue={minSalaryValue}
				/>
				<Input className="relative" caption="job type" custom>
					<SelectList
						onChange={filterKeyUp}
						items={jobType}
						getValue={getJobTypeValue}
					/>
				</Input>
				<Input
					className="relative"
					caption="experience level"
					inputType="text"
					custom
				>
					<SelectList
						getValue={getExperienceValue}
						onChange={filterKeyUp}
						items={experienceLevel}
					/>
				</Input>
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
						<Btn onClick={resetHandler}>reset</Btn>
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
export const jobsRouter: RouteObject = {
	path: "/jobs",
	children: [
		{ index: true, element: <Jobs /> },
		{
			...MyListingRoute,
		},
		{
			path: ":JobListingId",
			children: [
				{ index: true, element: <Navigate to="edit" /> },
				{
					...EditJobListingRoute,
				},
			],
		},
		{
			path: "new",
			element: <NewJobListing />,
		},
		{
			path: "order-completed",
			element: <OrderCompleted />,
		},
	],
}
