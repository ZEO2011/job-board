import classNames from "classnames"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { Link } from "react-router-dom"

type BtnType<T extends ElementType> = {
	children: ReactNode
	As?: T
	style?: "border" | "background" | "none" | "disabled"
	to?: string
} & ComponentPropsWithoutRef<T>

export default function Btn<T extends ElementType = "button">({
	children,
	As,
	to,
	style = "background",
	...restProps
}: BtnType<T>) {
	const Component = As || "button"
	const buttonClassNames = classNames(
		`text-lg py-2 px-4 rounded-lg transition hover:scale-[1.04] ${
			style === "background"
				? "bg-black dark:bg-white dark:text-black text-white"
				: style === "none"
				? "dark:text-white text-black"
				: style === "disabled"
				? "dark:bg-gray-400 bg-black bg-opacity-20 dark:bg-opacity-100 cursor-default hover:scale-100"
				: "!text-black dark:!text-white border-2 dark:border-slate-700 text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
		}`,
		restProps.className,
	)
	if (to) {
		return (
			<Link
				onClick={(e) => style === "disabled" && e.preventDefault()}
				to={to}
				{...restProps}
				className={buttonClassNames}
			>
				{children}
			</Link>
		)
	}

	return (
		<Component
			disabled={style === "disabled"}
			{...restProps}
			className={buttonClassNames}
		>
			{children}
		</Component>
	)
}
