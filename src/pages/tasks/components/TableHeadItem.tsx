import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import MenuList from "../../../components/ui/MenuList"
import Btn from "../../../components/ui/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowDown,
	faArrowUp,
	faArrowsUpDown,
	faClose,
} from "@fortawesome/free-solid-svg-icons"
import { ComponentPropsWithoutRef } from "react-markdown/lib/ast-to-react"
import classNames from "classnames"

type TableHeadItemType = ComponentPropsWithoutRef<"ul"> & {
	children: ReactNode
	setFilterValue?: Dispatch<SetStateAction<string>>
	parentClassName?: classNames.Argument
}
export default function TableHeadItem({
	children,
	parentClassName,
	setFilterValue,
	...restProps
}: TableHeadItemType) {
	const filterAlter = useState("")[1]
	const setFilter = setFilterValue ?? filterAlter
	const menuListClassNames = classNames(
		"right-0 md:left-0 w-36",
		restProps.className,
	)
	const parentClassNames = classNames(
		"h-full w-3/12 flex items-center justify-start",
		parentClassName,
	)
	return (
		<>
			<th className={parentClassNames}>
				<MenuList>
					<MenuList.ListBtn>
						<Btn
							style={"none"}
							As="div"
							className="flex items-center"
						>
							{children}
							<FontAwesomeIcon
								className="ml-2 sm:block hidden text-gray-600 text-sm dark:text-gray-400"
								icon={faArrowsUpDown}
							/>
						</Btn>
					</MenuList.ListBtn>
					<MenuList.MenuItems
						{...restProps}
						className={menuListClassNames}
					>
						<MenuList.MenuItem className="py-0">
							<div
								onClick={() => setFilter("asc")}
								className="w-full h-full flex justify-start py-3 items-center gap-1 pl-3"
							>
								<FontAwesomeIcon icon={faArrowUp} />
								Asc
							</div>
						</MenuList.MenuItem>
						<MenuList.MenuItem className="py-0">
							<div
								onClick={() => setFilter("dsc")}
								className="w-full h-full flex justify-start py-3 items-center gap-1 pl-3"
							>
								<FontAwesomeIcon icon={faArrowDown} />
								Dsc
							</div>
						</MenuList.MenuItem>
						<MenuList.MenuItem className="py-0">
							<div
								onClick={() => setFilter("clear")}
								className="w-full h-full flex justify-start py-3 items-center gap-1 pl-3"
							>
								<FontAwesomeIcon icon={faClose} />
								clear sort
							</div>
						</MenuList.MenuItem>
					</MenuList.MenuItems>
				</MenuList>
			</th>
		</>
	)
}
