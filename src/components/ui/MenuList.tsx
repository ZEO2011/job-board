import { ComponentPropsWithoutRef, ReactNode } from "react"
import { Menu } from "@headlessui/react"

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

function ListBtn({ children }: { children: ReactNode }) {
	return <Menu.Button>{children}</Menu.Button>
}

function MenuItems({ children }: { children?: ReactNode }) {
	return (
		<Menu.Items className="absolute right-0 w-[155%] bg-white dark:bg-slate-700 shadow-lg p-1 flex flex-col rounded-lg">
			{children}
		</Menu.Items>
	)
}

function MenuItem({
	children,
	...restProps
}: ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
	return (
		<Menu.Item>
			<button
				{...restProps}
				className="w-full py-2 px-1 dark:text-white transition hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg"
			>
				{children}
			</button>
		</Menu.Item>
	)
}
