import { Navigate, useNavigate } from "react-router-dom"
import Caption from "../../components/Caption"
import useLogin from "../../contexts/useLoginData"
import useJobListings from "../../contexts/useJobListings"
import Btn from "../../components/ui/Btn"
import MenuList from "../../components/ui/MenuList"
import extendDays from "../../constants/extendDays"
import { useState } from "react"
import JobListing from "../jobs/components/JobListing"
import ExtendJobListing from "./components/ExtendJobListing"

function MyListings() {
	const login = useLogin()
	const navigate = useNavigate()
	const { jobListings, setJobListings } = useJobListings()
	const [extendIsOpen, setExtendIsOpen] = useState(false)
	const filteredJobListings = jobListings.filter((el) => el.user)
	const [currentJobListing, setCurrentJobListing] = useState<
		Record<string, number | string>
	>({})
	// TODO: make the extend button work
	if (login?.loginData.email === "") return <Navigate to={"/login"} />
	function extendMenuItemHandler(
		days: number,
		salary: number,
		title: string,
	) {
		setCurrentJobListing({ days, salary, title })
	}
	function deleteHandler(id: string) {
		setJobListings((current) => {
			return current.filter((el) => {
				return el.id !== id
			})
		})
	}
	function editJobListingHandler(id: string) {
		return navigate(`/jobs/${id}`)
	}
	return (
		<>
			{extendIsOpen && (
				<ExtendJobListing
					salary={currentJobListing.salary}
					title={currentJobListing.title}
					extendSetter={setExtendIsOpen}
					days={currentJobListing.days}
				/>
			)}
			<Caption
				caption="my job listing"
				buttonCaption="create a listing"
				to="/jobs/new"
			/>
			<div className="w-full h-fit flex gap-6 flex-wrap justify-center items-center p-4 py-6 pt-12">
				{filteredJobListings.map((jobListing) => {
					return (
						<JobListing
							key={crypto.randomUUID()}
							setDate
							{...jobListing}
						>
							<Btn
								style={"none"}
								onClick={() =>
									deleteHandler(jobListing.id)
								}
							>
								delete
							</Btn>
							<Btn
								style={"border"}
								onClick={() =>
									editJobListingHandler(
										jobListing.id,
									)
								}
							>
								edit
							</Btn>
							<MenuList>
								<MenuList.ListBtn>
									<Btn>extend</Btn>
								</MenuList.ListBtn>
								<MenuList.MenuItems>
									{extendDays.map((day) => {
										return (
											<>
												<MenuList.MenuItem
													key={day.id}
													onClick={() => {
														extendMenuItemHandler(
															day.days,
															day.salary,
															jobListing.title,
														)
														setExtendIsOpen(
															true,
														)
													}}
												>
													{day.name}
												</MenuList.MenuItem>
											</>
										)
									})}
								</MenuList.MenuItems>
							</MenuList>
						</JobListing>
					)
				})}
			</div>
		</>
	)
}

const MyListingRoute = {
	path: "my-listings",
	element: <MyListings />,
}

export default MyListingRoute
