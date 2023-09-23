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

export default function NewJobListing() {
	const login = useLogin()
	const navigate = useNavigate()
	const { setJobListings } = useJobListings()
	const [value, toggle] = useToggle(false)
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
	const id = crypto.randomUUID()
	function getJobTypeData(name: JobTypeType["name"]) {
		setSelectedJobType(name)
	}
	function getExperienceLevelType(name: experienceType["name"]) {
		setSelectedExperience(name)
	}
	function saveHandler() {
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
					date: new Date(),
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
	if (login?.loginData.email === "") return <Navigate to={"/login"} />
	return (
		<>
			<Caption className="pl-0" caption="new listing" withoutBtn />
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center items-center w-full mx-auto h-fit gap-4 gap- md:py-2 mt-8 px-2 pb-12 md:px-4">
				<FilterInput
					className="w-full"
					caption="title"
					inputType="text"
					inputValue={title}
					setInputValue={setTitle}
				/>
				<FilterInput
					className="w-full"
					caption="company name"
					inputType="text"
					inputValue={companyName}
					setInputValue={setCompanyName}
				/>
				<FilterInput
					className="w-full"
					caption="location"
					inputType="text"
					inputValue={location}
					setInputValue={setLocation}
				/>
				<FilterInput
					className="w-full"
					caption="application url"
					inputType="url"
					inputValue={website}
					setInputValue={setWebsite}
				/>
				<FilterInput
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
					inputValue={salary}
					setInputValue={setSalary}
					className="w-full col-span-full lg:col-span-1"
					caption="salary"
					inputType="number"
				/>
				<FilterInput
					max={200}
					inputValue={description}
					setInputValue={setDescription}
					className="w-full col-span-2"
					caption="short description"
					inputType="text"
				/>
				<FilterInput
					inputValue={fullDescription}
					setInputValue={setFullDescription}
					as={"textarea"}
					className="w-full col-span-full h-[10rem]"
					inputClassName="h-full pt-3 user h-full"
					caption="full description"
					inputType="text"
				/>
			</div>
			<div className="w-full h-fit flex gap-2 justify-end px-4 py-4">
				<Btn onClick={toggle} style={"border"}>
					Show preview
				</Btn>
				<Btn onClick={saveHandler}>Save</Btn>
			</div>
			{value && (
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
					/>
				</div>
			)}
		</>
	)
}
