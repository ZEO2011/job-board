import classNames from "classnames"
import { ReactNode } from "react"

export default function Dialog({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) {
	const parentClassName = classNames(
		"z-50 absolute bg-white shadow-lg flex flex-col rounded-lg p-1 -left-10 top-12 dark:bg-slate-900 transition",
		className,
	)
	return (
		<>
			<div className={parentClassName}>{children}</div>
		</>
	)
}
