import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "../../../components/Dialog"
import useLogin from "../../../contexts/useLoginData"
import { Link } from "react-router-dom"

export default function LoginBtn({
	profileStatus,
}: {
	profileStatus: boolean
}) {
	const loginData = useLogin()
	function logout() {
		loginData?.setLoginData({ email: "", password: "" })
	}
	return (
		<>
			{loginData?.loginData.email.length === 0 ? (
				<button className="flex gap-2 items-center justify-between py-1">
					<Link className="w-full h-full" to="/login">
						login
					</Link>
				</button>
			) : (
				<>
					<button className="flex gap-2 items-center justify-between py-1">
						{loginData?.loginData.email}
						<FontAwesomeIcon
							icon={faChevronDown}
							className={`text-sm transition ${
								profileStatus && "rotate-180"
							}`}
						/>
					</button>
					{profileStatus && (
						<Dialog className="left-1/2 -translate-x-1/2">
							<button className="main-btn text-start pl-2 py-2 pr-8">
								my listing
							</button>
							<button
								className="main-btn text-start pl-2 py-2 pr-8"
								onClick={logout}
							>
								logout
							</button>
						</Dialog>
					)}
				</>
			)}
		</>
	)
}
