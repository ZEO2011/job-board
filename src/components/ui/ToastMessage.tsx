import { MouseEventHandler } from "react"
import { createPortal } from "react-dom"

export default function ToastMessage({
	onClick,
}: {
	onClick: MouseEventHandler
}) {
	return createPortal(
		<h1 onClick={onClick} className="w-full h-full bg-red-600">
			hi
		</h1>,
		document.getElementById("alert-messages") as Element,
	)
}
