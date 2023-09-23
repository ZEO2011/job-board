import classNames from "classnames"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { Link } from "react-router-dom"

type BtnType<T extends ElementType> = {
	children: ReactNode
	As?: T
	style?: "border" | "background"
	to?: string // Add 'to' prop for routing
} & ComponentPropsWithoutRef<T>

export default function Btn<T extends ElementType = "button">({
	children,
	As,
	to, // Include the 'to' prop
	style = "background",
	...restProps
}: BtnType<T>) {
	const Component = As || "button" // Use 'As' or default to "button"
	const buttonClassNames = classNames(
		`text-lg py-2 px-4 rounded-lg text-white transition hover:scale-[1.04] ${
			style === "background"
				? "bg-black dark:bg-white dark:text-black"
				: "text-black border-2 dark:border-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
		}`,
		restProps.className,
	)

	// Check if 'to' prop is provided and render either Link or a regular element
	if (to) {
		return (
			<Link to={to} {...restProps} className={buttonClassNames}>
				{children}
			</Link>
		)
	}

	return (
		<Component {...restProps} className={buttonClassNames}>
			{children}
		</Component>
	)
}
