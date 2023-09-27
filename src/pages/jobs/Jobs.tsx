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
	const [titleValue, setTitleValue] = useState("")
	const [locationValue, setLocationValue] = useState("")
	const [minSalaryValue, setMinSalaryValue] = useState("")
	const [jobTypeValue, setJobTypeValue] = useState("any")
	const [experienceValue, setExperienceValue] = useState("any")

	useEffect(() => {
		setFilteredJobListings(
			jobListings
				.filter((el) =>
					el.title
						?.toLowerCase()
						.includes(titleValue.toLowerCase()),
				)
				.filter((el) =>
					el.location
						?.toLowerCase()
						.includes(locationValue.toLowerCase()),
				)
				.filter((el) => el.salary >= +minSalaryValue)
				.filter((el) => {
					if (jobTypeValue === "any") return true
					return (
						el.time?.toLowerCase() ===
						jobTypeValue.toLowerCase()
					)
				})
				.filter((el) => {
					if (experienceValue === "any") return true
					return (
						el.experience?.toLowerCase() ===
						experienceValue.toLowerCase()
					)
				}),
		)
	}, [
		titleValue,
		locationValue,
		minSalaryValue,
		jobTypeValue,
		experienceValue,
		jobListings,
	])

	function resetHandler() {
		setTitleValue("")
		setLocationValue("")
		setMinSalaryValue("")
		setShowHidden(false)
		setShowFavorites(false)
		setFilteredJobListings(jobListings)
	}

	const [filteredJobListings, setFilteredJobListings] =
		useState<jobListings[]>(jobListings)

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
					setInputValue={setTitleValue}
				/>
				<Input
					inputValue={locationValue}
					setInputValue={setLocationValue}
					className="relative"
					caption="location"
					inputType="text"
				/>
				<Input
					caption="minimum salary"
					inputType="number"
					setInputValue={setMinSalaryValue}
					onKeyUp={resetHandler}
					inputValue={minSalaryValue}
				/>
				<Input
					as={"div"}
					className="relative"
					caption="job type"
					custom
				>
					<SelectList
						items={jobType}
						getValue={(name) => setJobTypeValue(name)}
					/>
				</Input>
				<Input
					as={"div"}
					className="relative"
					caption="experience level"
					inputType="text"
					custom
				>
					<SelectList
						getValue={(name) => setExperienceValue(name)}
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
