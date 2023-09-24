import { Navigate, useNavigate } from "react-router-dom"
import useLogin from "../../../contexts/useLoginData"
import SelectList from "../../../components/ui/SelectList"
import { FilterInput } from "./FilterInput"
import jobType from "../../../constants/jobType"
import experienceLevel from "../../../constants/experienceLevel"
import Caption from "../../../components/Caption"
import Btn from "../../../components/ui/Btn"
import { useSessionStorage, useToggle } from "usehooks-ts"
import JobListing from "./JobListing"
import { JobTypeType, experienceType } from "../../../utils/types"
import useJobListings from "../../../contexts/useJobListings"
import { useState } from "react"
import { checkLength, checkNumber, checkURL } from "../../../validators"

export default function NewJobListing() {
	const login = useLogin()
	const navigate = useNavigate()
	const { setJobListings } = useJobListings()
	const [previewValue, toggle] = useToggle(false)
	const [title, setTitle] = useSessionStorage("title", "")
	const [companyName, setCompanyName] = useSessionStorage("companyName", "")
	const [location, setLocation] = useSessionStorage("location", "")
	const [website, setWebsite] = useSessionStorage("website", "")
	const [description, setDescription] = useSessionStorage("description", "")
	const [fullDescription, setFullDescription] = useSessionStorage(
		"fullDescription",
		"",
	)
	const [selectedJobType, setSelectedJobType] = useSessionStorage<
		JobTypeType["name"]
	>("selectedJobType", "any")
	const [selectedExperience, setSelectedExperience] = useSessionStorage<
		experienceType["name"]
	>("selectedExperience", "any")
	const [salary, setSalary] = useSessionStorage("salary", "")
	const [firstSubmit, setFirstSubmit] = useState(true)
	const titleErrors = !firstSubmit ? checkLength(title, "title", 1) : []
	const companyNameErrors = !firstSubmit
		? checkLength(companyName, "company name", 1)
		: []
	const locationErrors = !firstSubmit
		? checkLength(location, "location", 1)
		: []
	const applicationURLErrors = !firstSubmit ? checkURL(website) : []
	const salaryErrors = !firstSubmit ? checkNumber(salary, "salary", 5) : []
	const descriptionErrors = !firstSubmit
		? checkLength(description, "description", 30)
		: []
	const fullDescriptionErrors = !firstSubmit
		? checkLength(fullDescription, "description", 20)
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
				return [
					...c,
					{
						title,
						companyName,
						category: location,
						website,
						time: selectedJobType,
						experience: selectedExperience,
						salary: +salary,
						description,
						fullDescription,
						user: true,
						id,
						hidden: false,
						favorite: false,
						date: `${new Date()}`,
					},
				]
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
			return navigate("/jobs")
		}
	}
	if (login?.loginData.email === "") return <Navigate to={"/login"} />
	return (
		<>
			<Caption className="pl-0" caption="new listing" withoutBtn />
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center items-center w-full mx-auto h-fit gap-4 gap- md:py-2 mt-8 px-2 pb-12 md:px-4">
				<FilterInput
					errors={titleErrors}
					required
					className="w-full"
					caption="title"
					inputType="text"
					inputValue={title}
					setInputValue={setTitle}
				/>
				<FilterInput
					errors={companyNameErrors}
					required
					className="w-full"
					caption="company name"
					inputType="text"
					inputValue={companyName}
					setInputValue={setCompanyName}
				/>
				<FilterInput
					errors={locationErrors}
					required
					className="w-full"
					caption="location"
					inputType="text"
					inputValue={location}
					setInputValue={setLocation}
				/>
				<FilterInput
					errors={applicationURLErrors}
					required
					className="w-full"
					caption="application url"
					inputType="url"
					inputValue={website}
					setInputValue={setWebsite}
				/>
				<FilterInput
					required
					className="relative w-full"
					caption="job type"
					custom
				>
					<SelectList<JobTypeType>
						getValue={getJobTypeData}
						items={jobType}
					/>
				</FilterInput>
				<FilterInput
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
				</FilterInput>
				<FilterInput
					errors={salaryErrors}
					required
					inputValue={salary}
					setInputValue={setSalary}
					className="w-full col-span-full lg:col-span-1"
					caption="salary"
					inputType="number"
				/>
				<FilterInput
					errors={descriptionErrors}
					required
					max={200}
					inputValue={description}
					setInputValue={setDescription}
					className="w-full col-span-2"
					caption="short description"
					inputType="text"
				/>
				<FilterInput
					errors={fullDescriptionErrors}
					required
					inputValue={fullDescription}
					setInputValue={setFullDescription}
					as={"textarea"}
					className="w-full col-span-full h-[15rem]"
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
					Save
				</Btn>
			</div>
			{previewValue && (
				<div className="p-4">
					<JobListing
						className="w-[min(40rem,100%)]"
						title={title}
						companyName={companyName}
						category={location}
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
