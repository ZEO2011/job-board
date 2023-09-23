import { Dispatch, SetStateAction } from "react"
import { createPortal } from "react-dom"
import { jobListings } from "../../../utils/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowUpRightFromSquare,
	faClose,
	faGraduationCap,
	faMoneyBill,
} from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import Btn from "../../../components/ui/Btn"

export default function JobListingView({
	viewStatus,
	title,
	companyName,
	category,
	salary,
	time,
	experience,
	fullDescription,
	website,
}: {
	viewStatus: Dispatch<SetStateAction<boolean>>
} & Omit<
	jobListings,
	"date" | "id" | "favorite" | "hidden" | "description" | "user"
>) {
	document.addEventListener("keyup", (e) => {
		if (e.key === "Escape") {
			viewStatus(false)
		}
	})
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	})
	const formattedSalary = currencyFormatter
		.format(salary)
		.replace(/\.00$/, "")
	return createPortal(
		<div className="w-[min(50rem,100%)] mx-2 h-[80%] bg-white shadow-lg dark:border-slate-600 border-2 dark:bg-slate-700 rounded-lg px-6">
			<div className="w-full h-fit flex justify-between pt-5 mb-2">
				<h3 className="text-xl m-0">{title}</h3>
				<button
					onClick={() => viewStatus(false)}
					className="w-fit h-fit"
				>
					<FontAwesomeIcon
						icon={faClose}
						className="text-gray-500 transition hover:text-black text-xl"
					/>
				</button>
			</div>
			<div className="w-full h-fit flex flex-col text-gray-500 gap-1">
				<p className="text-gray-400">{companyName}</p>
				<p className="text-gray-400">{category}</p>
			</div>
			<div className="flex gap-2 my-2">
				<div className="flex gap-2 rounded-full bg-gray-200 dark:bg-slate-900 p-1.5 px-3 text-md">
					<FontAwesomeIcon icon={faMoneyBill} />
					<p>{formattedSalary}</p>
				</div>
				<div className="flex gap-2 rounded-full bg-gray-200 dark:bg-slate-900 p-1.5 px-3 text-md">
					<FontAwesomeIcon icon={faCalendar} />
					<p>{time}</p>
				</div>
				<div className="flex gap-2 rounded-full bg-gray-200 dark:bg-slate-900 p-1.5 px-3 text-md">
					<FontAwesomeIcon icon={faGraduationCap} />
					<p>{experience}</p>
				</div>
			</div>
			<Btn
				As="a"
				href={website}
				className="w-fit px-2 py-2 mt-4 flex gap-2 items-center"
			>
				apply to the company site{" "}
				<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
			</Btn>
			<div className="my-4">{fullDescription}</div>
		</div>,
		document.getElementById("alert-messages") as Element,
	)
}
