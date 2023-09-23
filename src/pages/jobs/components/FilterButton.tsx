import { Switch } from "@headlessui/react"
import { Dispatch, SetStateAction } from "react"

type FilterButtonType = {
	caption: string
	enabled: boolean
	setEnabled: Dispatch<SetStateAction<boolean>>
}
export default function FilterButton({
	caption,
	enabled,
	setEnabled,
}: FilterButtonType) {
	return (
		<div className="flex gap-2 items-center justify-center w-fit h-fit">
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${
					enabled
						? "bg-blue-600"
						: "bg-gray-200 dark:bg-slate-600"
				} relative inline-flex h-6 w-11 items-center rounded-full`}
			>
				<span
					className={`${
						enabled ? "translate-x-6" : "translate-x-1"
					} inline-block h-4 w-4 transform rounded-full bg-white transition`}
				/>
			</Switch>
			<p className="dark:text-white">{caption}</p>
		</div>
	)
}
