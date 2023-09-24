import { Navigate } from "react-router-dom"
import Caption from "../components/Caption"
import useLogin from "../contexts/useLoginData"
import JobListings from "./jobs/components/JobListings"
import useJobListings from "../contexts/useJobListings"

export default function MyListings() {
	const login = useLogin()
	const { jobListings, setJobListings } = useJobListings()
	const filteredJobListings = jobListings.filter((el) => el.user)
	if (login?.loginData.email === "") return <Navigate to={"/login"} />
	return (
		<>
			<Caption
				caption="my job listing"
				buttonCaption="create a listing"
				to="/jobs/new"
			/>
			<JobListings
				setDate
				jobListings={filteredJobListings}
				setJobListings={setJobListings}
			/>
		</>
	)
}
