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
	const getBaseClass = (style: string) => {
		switch (style) {
			case "background":
				return "bg-black dark:bg-white dark:text-black text-white transition hover:scale-[1.04]"
			case "none":
				return "dark:text-white transition hover:scale-[1.04] text-black hover:bg-gray-200 dark:hover:bg-slate-700"
			case "disabled":
				return "dark:bg-gray-400 bg-black bg-opacity-20 dark:bg-opacity-100 cursor-default hover:scale-100"
			default:
				return "!text-black dark:!text-white transition hover:scale-[1.04] border-2 dark:border-slate-700 text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
		}
	}
	const baseClass = getBaseClass(style)
	const buttonClassNames = classNames(
		"text-lg py-2 px-4 rounded-lg",
		baseClass,
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
