import Btn from "../components/ui/Btn"

export default function ErrorPage() {
	return (
		<div className="flex flex-col dark:text-white items-center">
			<h1 className="text-5xl font-bold">Error</h1>
			<p className="mb-6 text-xl">
				Something went wrong. Please try again later.
			</p>
			<Btn to="/jobs">take me home</Btn>
		</div>
	)
}
