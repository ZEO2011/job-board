import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom"
import useJobListings from "../contexts/useJobListings"
import JobListing from "./jobs/components/JobListing"
import Btn from "../components/ui/Btn"
import { Input } from "../components/ui/Input"
import experienceLevel from "../constants/experienceLevel"
import SelectList from "../components/ui/SelectList"
import jobType from "../constants/jobType"
import { JobTypeType, experienceType } from "../utils/types"
import Caption from "../components/Caption"
import { checkLength, checkNumber, checkURL } from "../validators"
import { useState } from "react"
import { useToggle } from "usehooks-ts"

function EditJobListing() {
	const loaderData = useLoaderData() as { JobListingId: string }
	const { jobListings } = useJobListings()
	const currentJobListing = jobListings.filter((el) => {
		return el.id == loaderData.JobListingId
	})[0]
	const navigate = useNavigate()
	const { setJobListings } = useJobListings()
	const [previewValue, toggle] = useToggle(false)
	const [title, setTitle] = useState(currentJobListing.title)
	const [companyName, setCompanyName] = useState(
		currentJobListing.companyName,
	)
	const [location, setLocation] = useState(currentJobListing.location)
	const [website, setWebsite] = useState(currentJobListing.website)
	const [description, setDescription] = useState(
		currentJobListing.description,
	)
	const [fullDescription, setFullDescription] = useState(
		currentJobListing.fullDescription,
	)
	const [selectedJobType, setSelectedJobType] = useState<
		JobTypeType["name"]
	>(currentJobListing.time)
	const [selectedExperience, setSelectedExperience] = useState<
		experienceType["name"]
	>(currentJobListing.experience)
	const [salary, setSalary] = useState(`${currentJobListing.salary}`)
	const [firstSubmit, setFirstSubmit] = useState(true)
	const titleErrors = !firstSubmit ? checkLength(title, "title", 1) : []
	const companyNameErrors = !firstSubmit
		? checkLength(companyName, "company name", 1)
		: []
	const locationErrors = !firstSubmit
		? checkLength(location, "location", 1)
		: []
	const applicationURLErrors = !firstSubmit ? checkURL(website) : []
	const salaryErrors = !firstSubmit
		? checkNumber(`${salary}`, "salary", 5)
		: []
	const descriptionErrors = !firstSubmit
		? checkLength(description, "description", 30)
		: []
	const fullDescriptionErrors = !firstSubmit
		? checkLength(fullDescription, "full description", 20)
		: []
	const errors =
		titleErrors.length +
		companyNameErrors.length +
		locationErrors.length +
		applicationURLErrors.length +
		salaryErrors.length +
		descriptionErrors.length +
		fullDescriptionErrors.length
	const id = crypto.randomUUID()
	function getJobTypeData(name: JobTypeType["name"]) {
		setSelectedJobType(name)
	}
	function getExperienceLevelType(name: experienceType["name"]) {
		setSelectedExperience(name)
	}
	function submit() {
		setFirstSubmit(false)
		if (!firstSubmit) {
			setJobListings((c) => {
				return c.map((el) => {
					if (el.id == currentJobListing.id) {
						return {
							title,
							companyName,
							location: location,
							website,
							time: selectedJobType,
							experience: selectedExperience,
							salary: +salary,
							description,
							fullDescription,
							id: el.id,
							hidden: el.hidden,
							favorite: el.favorite,
							date: el.date,
							user: el.user,
						}
					}
					return el
				})
			})
			setTitle("")
			setCompanyName("")
			setLocation("")
			setWebsite("")
			setSelectedJobType("any")
			setSelectedExperience("any")
			setSalary("0")
			setDescription("")
			setFullDescription("")
			return navigate("/jobs/my-listings/")
		}
	}
	return (
		<>
			<Caption
				className="pl-0"
				caption="edit Job Listing"
				withoutBtn
			/>
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center items-center w-full mx-auto h-fit gap-4 gap- md:py-2 mt-8 px-2 pb-12 md:px-4">
				<Input
					errors={titleErrors}
					required
					className="w-full"
					caption="title"
					inputType="text"
					inputValue={title}
					setInputValue={setTitle}
				/>
				<Input
					errors={companyNameErrors}
					required
					className="w-full"
					caption="company name"
					inputType="text"
					inputValue={companyName}
					setInputValue={setCompanyName}
				/>
				<Input
					errors={locationErrors}
					required
					className="w-full"
					caption="location"
					inputType="text"
					inputValue={location}
					setInputValue={setLocation}
				/>
				<Input
					errors={applicationURLErrors}
					required
					className="w-full"
					caption="application url"
					inputType="url"
					inputValue={website}
					setInputValue={setWebsite}
				/>
				<Input
					required
					className="relative w-full"
					caption="job type"
					custom
				>
					<SelectList<JobTypeType>
						getValue={getJobTypeData}
						items={jobType}
					/>
				</Input>
				<Input
					required
					className="relative w-full"
					caption="experience level"
					inputType="text"
					custom
				>
					<SelectList<experienceType>
						getValue={getExperienceLevelType}
						className="top-72"
						items={experienceLevel}
					/>
				</Input>
				<Input
					errors={salaryErrors}
					required
					inputValue={salary}
					setInputValue={setSalary}
					className="w-full col-span-full lg:col-span-1"
					caption="salary"
					inputType="number"
				/>
				<Input
					errors={descriptionErrors}
					required
					max={200}
					inputValue={description}
					setInputValue={setDescription}
					className="w-full col-span-2"
					caption="short description"
					inputType="text"
				/>
				<Input
					errors={fullDescriptionErrors}
					required
					inputValue={fullDescription}
					setInputValue={setFullDescription}
					as={"textarea"}
					className="w-full col-span-full !h-[15rem]"
					inputClassName="!h-full pt-3 user"
					caption="full description"
					inputType="text"
				/>
			</div>
			<div className="w-full h-fit flex gap-2 justify-end px-4 py-4">
				<Btn onClick={toggle} style={"border"}>
					{previewValue ? "hide" : "show"} preview
				</Btn>
				<Btn
					style={errors > 0 ? "disabled" : "background"}
					onClick={submit}
				>
					Edit
				</Btn>
			</div>
			{previewValue && (
				<div className="p-4">
					<JobListing
						className="w-[min(40rem,100%)]"
						title={title}
						companyName={companyName}
						location={location}
						website={website}
						time={selectedJobType}
						experience={selectedExperience}
						favorite={false}
						hidden={false}
						id={id}
						salary={+salary}
						description={description}
						fullDescription={fullDescription}
						date={`${new Date()}`}
					/>
				</div>
			)}
		</>
	)
}

const loader: LoaderFunction = ({ params }) => {
	return params
}

const EditJobListingRoute = {
	loader,
	path: "edit",
	element: <EditJobListing />,
}

export default EditJobListingRoute
