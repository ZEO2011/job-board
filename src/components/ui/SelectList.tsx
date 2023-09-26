import { ReactNode, useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

export default function SelectList<
	T extends {
		id: number
		name: string
	},
>({
	items,
	className,
	getValue,
	children,
	onChange,
}: {
	items: T[]
	className?: classNames.Argument
	children?: ReactNode
	getValue?: (name: T["name"]) => void
	onChange?: () => void
}) {
	const [selectedItem, setSelectedItem] = useState(items[0])
	useEffect(() => {
		if (onChange) onChange()
	}, [onChange, selectedItem])
	useEffect(() => {
		if (getValue) getValue(selectedItem.name)
	}, [getValue, selectedItem])
	const optionsClassName = classNames(
		"absolute top-[4.8rem] w-full bg-white shadow-lg z-50 p-4 flex flex-col divide-y-2 justify-center dark:bg-slate-700 dark:divide-gray-500 rounded-b-lg py-1",
		className,
	)
	return (
		<Listbox value={selectedItem} onChange={setSelectedItem}>
			{children ? (
				<Listbox.Button>{children}</Listbox.Button>
			) : (
				<Listbox.Button className="border-2 rounded-md h-12 px-3 text-start dark:bg-slate-700 dark:border-0 dark:text-white">
					{selectedItem.name}
				</Listbox.Button>
			)}
			<Listbox.Options className={optionsClassName}>
				{items.map((item) => (
					<Listbox.Option
						className="cursor-pointer w-full h-8 flex py-6 items-center gap-3"
						key={item.id}
						value={item}
					>
						{({ selected }) => {
							return (
								<>
									<div className="w-4 h-full flex items-center">
										{selected && (
											<FontAwesomeIcon
												className="dark:text-white"
												icon={faCheck}
											/>
										)}
									</div>
									<p className="dark:text-white">
										{item.name}
									</p>
								</>
							)
						}}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	)
}
