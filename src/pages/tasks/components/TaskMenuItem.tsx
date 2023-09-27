import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Menu, RadioGroup } from "@headlessui/react"
import { Dispatch, SetStateAction } from "react"
import MenuList from "../../../components/ui/MenuList"
import useTasks from "../../../contexts/useTasks"

type TaskMenuItemType<T> = {
	title: string
	items: string[]
	item: T
	setItem: Dispatch<SetStateAction<T>>
	taskId: string
	property: string
}
export default function TaskMenuItem<T>({
	title,
	items,
	item,
	setItem,
	taskId,
	property,
}: TaskMenuItemType<T>) {
	const { setTasks } = useTasks()
	function optionHandler(item: string) {
		setTasks((c) => {
			return c.map((el) => {
				if (el.id === taskId) {
					return { ...el, [property]: item }
				}
				return el
			})
		})
	}
	return (
		<>
			<MenuList.MenuItem className="flex justify-start flex-col gap-4 w-fit">
				<MenuList>
					<div className="w-fit h-fit relative">
						<MenuList.ListBtn className="flex justify-between w-36 z-20 items-center px-2">
							{title}
							<FontAwesomeIcon icon={faArrowRight} />
						</MenuList.ListBtn>
						<Menu.Items className={"z-50"}>
							<Menu.Item>
								<RadioGroup
									className={
										"absolute top-1 -right-44 py-2 bg-white dark:bg-slate-800 px-2 rounded-lg w-44 shadow-lg"
									}
									value={item}
									onChange={setItem}
								>
									{items.map((item) => {
										return (
											<RadioGroup.Option
												className="flex gap-2 items-center rounded-lg p-0 pl-2 py-2 transition hover:bg-gray-100 hover:dark:bg-slate-700 w-full"
												value={item}
												onClick={() =>
													optionHandler(
														item,
													)
												}
											>
												{({ checked }) => {
													return (
														<>
															{checked ? (
																<div className="w-3 h-3 rounded-full bg-black dark:bg-white"></div>
															) : (
																<div className="w-3 h-3"></div>
															)}
															<span>
																{
																	item
																}
															</span>
														</>
													)
												}}
											</RadioGroup.Option>
										)
									})}
								</RadioGroup>
							</Menu.Item>
						</Menu.Items>
					</div>
				</MenuList>
			</MenuList.MenuItem>
		</>
	)
}
