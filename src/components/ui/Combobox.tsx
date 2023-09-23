import { useState } from "react"
import { Combobox } from "@headlessui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export default function ComboBoxList({ items }: { items: string[] }) {
	const [selectedPerson, setSelectedPerson] = useState()
	const [query, setQuery] = useState("")
	const isQueryNull = query === ""
	const filter = items.filter((person) => {
		return person.toLowerCase().includes(query.toLowerCase())
	})
	const filteredPeople = isQueryNull ? items : filter

	return (
		<Combobox value={selectedPerson} onChange={setSelectedPerson}>
			<Combobox.Input
				className="border-2 rounded-md h-12 px-3 relative dark:text-white dark:bg-slate-700 dark:border-gray-700"
				onChange={(event) => setQuery(event.target.value)}
			/>
			<Combobox.Options
				className={
					"absolute top-20 min-w-[28rem] bg-white shadow-lg z-50 p-4 flex flex-col  divide-y-2 justify-center dark:divide-gray-500 dark:bg-slate-700 py-1"
				}
			>
				{filteredPeople.map((country) => (
					<Combobox.Option
						key={country}
						value={country}
						className="cursor-pointer w-full h-8 flex py-6 items-center"
					>
						{({ selected }) => {
							return (
								<div className="w-full flex gap-2 items-center">
									<div className="w-4 h-full flex items-center">
										{selected && (
											<FontAwesomeIcon
												icon={faCheck}
											/>
										)}
									</div>
									<p className="dark:text-white">
										{country}
									</p>
								</div>
							)
						}}
					</Combobox.Option>
				))}
			</Combobox.Options>
		</Combobox>
	)
}
