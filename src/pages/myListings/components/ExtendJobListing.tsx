import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction } from "react"
import { createPortal } from "react-dom"
import Btn from "../../../components/ui/Btn"

export default function ExtendJobListing({
	extendSetter,
	days,
	title,
	salary,
}: {
	extendSetter: Dispatch<SetStateAction<boolean>>
	days: number | string
	title: string | number
	salary: string | number
}) {
	return createPortal(
		<div className="shadow-lg bg-white dark:bg-slate-900 w-[35rem] h-fit p-4 rounded-lg">
			<div className="h-fit mb-6 flex items-center w-full justify-between">
				<div>
					<h3 className="text-xl">
						Extend {title} for {days} days
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						This is a non-refundable purchase.
					</p>
				</div>
				<Btn
					style={"border"}
					className="w-10 h-10 !p-0 grid place-items-center"
					onClick={() => extendSetter(false)}
				>
					<FontAwesomeIcon icon={faClose} className="text-2xl" />
				</Btn>
			</div>
			<p className="text-lg">
				This is where the Stripe checkout would go but this is just
				a demo with no real server so it cannot accept payments.
				Clicking the pay button will emulate what would happen if
				you did make a successful payment.
			</p>
			<Btn
				className="w-full hover:scale-[1.01] mt-3 text-center"
				to="/jobs/order-completed"
			>
				pay for ${salary}
			</Btn>
		</div>,
		document.getElementById("alert-messages") as Element,
	)
}
