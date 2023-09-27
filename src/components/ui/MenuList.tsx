import { ComponentPropsWithoutRef, ReactNode } from "react"
import { Menu } from "@headlessui/react"
import classNames from "classnames"

type MenuListType = {
	children: ReactNode
}
export default function MenuList({ children }: MenuListType) {
	return (
		<>
			<Menu>
				<div className="relative">{children}</div>
			</Menu>
		</>
	)
}

MenuList.ListBtn = ListBtn
MenuList.MenuItems = MenuItems
MenuList.MenuItem = MenuItem

function ListBtn({
	children,
	...restProps
}: ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
	return <Menu.Button {...restProps}>{children}</Menu.Button>
}

function MenuItems({
	children,
	className,
	removeClassNames = false,
}: {
	className?: classNames.Argument
	children?: ReactNode
	removeClassNames?: boolean
}) {
	const parentClassNames = classNames(
		!removeClassNames &&
			"absolute z-50 right-0 w-[155%] bg-white dark:bg-slate-700 shadow-lg p-1 flex flex-col rounded-lg",
		className,
	)
	return <Menu.Items className={parentClassNames}>{children}</Menu.Items>
}

function MenuItem({
	children,
	removeClasses = false,
	...restProps
}: ComponentPropsWithoutRef<"button"> & {
	children: ReactNode
	removeClasses?: boolean
}) {
	const btnClassNames = classNames(
		!removeClasses &&
			"w-full py-2 px-1 dark:text-white transition hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg",
		restProps.className,
	)
	return (
		<Menu.Item>
			<button {...restProps} className={btnClassNames}>
				{children}
			</button>
		</Menu.Item>
	)
}
