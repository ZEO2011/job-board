import { ReactNode, useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
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
	btnClassName,
}: {
	items: T[]
	className?: classNames.Argument
	btnClassName?: classNames.Argument
	children?: ReactNode
	getValue?: (name: T["name"]) => void
	onChange?: () => void
}) {
	const [selectedItem, setSelectedItem] = useState(items[0])
	const selectedItemName = selectedItem.name

	// Use a single useEffect for selectedItem changes
	useEffect(() => {
		if (onChange) onChange() // Call onChange when selectedItem changes
		if (getValue) getValue(selectedItemName) // Call getValue when selectedItem changes
	}, [onChange, getValue, selectedItemName])

	const optionsClassName = classNames(
		"absolute top-[4.8rem] w-full bg-white shadow-lg z-50 p-4 flex flex-col divide-y-2 justify-center dark:bg-slate-700 dark:divide-gray-500 rounded-b-lg py-1",
		className,
	)

	const btnClassNames = classNames(
		"border-2 rounded-md h-12 px-3 text-start dark:bg-slate-700 dark:border-0 dark:text-white",
		btnClassName,
	)

	return (
		<Listbox value={selectedItem} onChange={setSelectedItem}>
			{children ? (
				<Listbox.Button>{children}</Listbox.Button>
			) : (
				<Listbox.Button className={btnClassNames}>
					{selectedItem.name}
				</Listbox.Button>
			)}
			<Listbox.Options className={optionsClassName}>
				{items.map((item) => (
					<Listbox.Option
						className="cursor-pointer w-full h-8 flex py-6 items-center gap-3"
						key={item.id.toString()} // Use the actual ID instead of crypto.randomUUID()
						value={item}
					>
						<p className="dark:text-white">{item.name}</p>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	)
}
