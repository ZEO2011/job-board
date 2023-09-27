import classNames from "classnames"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

type CaptionType = Partial<typeof Link> & {
	caption: string
	buttonCaption?: string | ReactNode
	withoutBtn?: boolean
	to?: string
	className?: string
}

export default function Caption({
	caption,
	buttonCaption,
	to,
	withoutBtn,
	className,
	...restProps
}: CaptionType) {
	const h1ClassNames = classNames(
		"w-full h-24 py-2 flex justify-between items-center dark:text-white font-bold text-5xl",
		className,
	)
	return (
		<div className="w-full h-24 py-2 px-8 flex justify-between items-center">
			<h1 className={h1ClassNames}>{caption}</h1>
			{!withoutBtn && (
				<Link
					{...restProps}
					to={to ? to : ""}
					className="main-btn dark:border-slate-700 border-2 py-1 dark:text-white text-lg"
				>
					{buttonCaption}
				</Link>
			)}
		</div>
	)
}
