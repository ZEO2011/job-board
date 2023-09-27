import {
	faCalendar,
	faEye,
	faEyeSlash,
	faHeart,
} from "@fortawesome/free-regular-svg-icons"
import { faHeart as favoriteHeart } from "@fortawesome/free-solid-svg-icons"
import { faGraduationCap, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { jobListings } from "../../../utils/types"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { useToggle } from "usehooks-ts"
import JobListingView from "./JobListingView"
import classNames from "classnames"
import { format } from "date-fns"
import Btn from "../../../components/ui/Btn"

export default function JobListing({
	setJobListings,
	title,
	companyName,
	location,
	salary,
	time,
	experience,
	description,
	fullDescription,
	hidden,
	favorite,
	id,
	website,
	className,
	date,
	setDate,
	children,
}: Omit<jobListings, "user"> &
	Partial<{ setJobListings: Dispatch<SetStateAction<jobListings[]>> }> & {
		className?: string
		setDate?: boolean
		children?: ReactNode
	}) {
	const [showMessage, toggleMessage, setToggleMessage] = useToggle(false)
	const parentClassNames = classNames(
		"border-2 p-4 w-[40rem] h-[20rem] rounded-lg px-6 relative dark:border-slate-700 dark:text-white",
		className,
	)
	function favoriteHandler() {
		if (setJobListings)
			setJobListings((current) => {
				return current.map((jobListing) => {
					if (jobListing.id == id)
						return {
							...jobListing,
							favorite: jobListing.favorite ? false : true,
						}
					return jobListing
				})
			})
	}
	function hiddenHandler() {
		if (setJobListings)
			setJobListings((current) => {
				return current.map((jobListing) => {
					if (jobListing.id == id)
						return {
							...jobListing,
							hidden: jobListing.hidden ? false : true,
						}
					return jobListing
				})
			})
	}
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	})
	const formattedSalary = currencyFormatter
		.format(salary)
		.replace(/\.00$/, "")
	const jobListingDate = format(Date.parse(date), "dd")
	const daysGone = +jobListingDate - +format(new Date(), "dd")
	const [formattedDate, setFormattedDate] = useState<string | number>(
		`${daysGone} days left`,
	)
	useEffect(() => {
		if (daysGone == 0) setFormattedDate("today")
		if (daysGone == 1) setFormattedDate("yesterday")
	}, [daysGone])
	return (
		<>
			{showMessage && (
				<JobListingView
					viewStatus={setToggleMessage}
					title={title}
					companyName={companyName}
					location={location}
					salary={salary}
					time={time}
					experience={experience}
					fullDescription={fullDescription}
					website={website}
				/>
			)}
			<div className={parentClassNames}>
				<div
					className={`header w-full h-fit flex justify-between items-center ${
						hidden && "opacity-50"
					}`}
				>
					<h3 className="text-3xl font-bold">{title}</h3>
					<div className="flex gap-1">
						{!setDate && (
							<>
								<div
									className="w-12 h-12 grid place-items-center cursor-pointer transition hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full"
									onClick={hiddenHandler}
								>
									<FontAwesomeIcon
										icon={
											hidden
												? faEyeSlash
												: faEye
										}
										className="text-xl"
									/>
								</div>
								<div
									className="w-12 h-12 grid place-items-center cursor-pointer transition hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full"
									onClick={favoriteHandler}
								>
									<FontAwesomeIcon
										icon={
											favorite
												? favoriteHeart
												: faHeart
										}
										className={`${
											favorite &&
											"text-red-600"
										} text-xl`}
									/>
								</div>
							</>
						)}
						{setDate && (
							<>
								<Btn className="text-sm">
									active - {formattedDate}
								</Btn>
							</>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<p className="dark:text-gray-200 text-gray-500">
						{companyName}
					</p>
					<p className="dark:text-gray-200 text-gray-500 mb-2">
						{location}
					</p>
				</div>
				<div className="flex gap-2 mb-2">
					<div
						className={`flex items-center gap-2 rounded-full bg-gray-200 dark:bg-slate-700 p-1.5 px-3 text-md ${
							hidden && "opacity-50"
						}`}
					>
						<FontAwesomeIcon icon={faMoneyBill} />
						<p>{formattedSalary}</p>
					</div>
					<div
						className={`flex items-center gap-2 rounded-full bg-gray-200 dark:bg-slate-700 p-1.5 px-3 text-md ${
							hidden && "opacity-50"
						}`}
					>
						<FontAwesomeIcon icon={faCalendar} />
						<p>{time}</p>
					</div>
					<div
						className={`flex items-center gap-2 rounded-full bg-gray-200 dark:bg-slate-700 p-1.5 px-3 text-md ${
							hidden && "opacity-50"
						}`}
					>
						<FontAwesomeIcon icon={faGraduationCap} />
						<p>{experience}</p>
					</div>
				</div>
				<p className={`p-4 pl-0 text-lg ${hidden && "opacity-50"}`}>
					{description}
				</p>
				<div className="absolute bottom-3 right-5 flex gap-2">
					{children ?? (
						<Btn
							onClick={toggleMessage}
							className={`${hidden && "opacity-50"}`}
						>
							view more
						</Btn>
					)}
				</div>
			</div>
		</>
	)
}
