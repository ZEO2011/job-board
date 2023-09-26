import Btn from "../components/ui/Btn"

export default function OrderCompleted() {
	return (
		<div className="flex flex-col dark:text-white items-center">
			<h1 className="text-5xl font-bold">Order Complete</h1>
			<p className="mb-6 text-xl">Payment succeeded</p>
			<Btn to="/jobs">View your job listing</Btn>
		</div>
	)
}
