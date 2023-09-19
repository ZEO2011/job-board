import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useLogin from "../contexts/useLoginData"

export default function Login() {
	const navigate = useNavigate()
	const login = useLogin()
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
	const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false)
	function submit(confirm: boolean = false) {
		if (confirm === confirmPasswordStatus) {
			if (confirmPasswordStatus === true) {
				if (passwordValue !== confirmPasswordValue) {
					return alert(
						"password doesn't the same as the confirm password input",
					)
				}
			}
			const emailRegex = /[a-zA-Z1-9]{1,}@[a-zA-Z]{1,}/gi
			if (!emailRegex.test(emailValue)) {
				return alert("the email must end with @(gmail, etc.)")
			}
		}
		setConfirmPasswordStatus(confirm)
		login?.setLoginData({
			email: emailValue,
			password: passwordValue,
		})
		return navigate("/jobs")
	}
	return (
		<div className="w-full h-[calc(100%-5rem)] grid place-items-center">
			<div className="w-96 h-fit rounded-lg shadow-lg p-6 dark:bg-slate-800">
				<h2 className="dark:text-white text-2xl font-bold mb-1">
					log in
				</h2>
				<p className="text-gray-500 dark:text-gray-200">
					You can use any email and password to log in to the
					demo version
				</p>
				<div className="w-full min-h-56 pb-5 pt-4 flex flex-col gap-4">
					<div className="email">
						<label
							htmlFor="email"
							className="font-semibold dark:text-white"
						>
							email
						</label>
						<input
							value={emailValue}
							onChange={(e) =>
								setEmailValue(e.currentTarget.value)
							}
							required
							id="email"
							type="email"
							className="border-2 dark:border-0 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700"
						/>
					</div>
					<div className="password">
						<label
							htmlFor="password"
							className="font-semibold dark:text-white"
						>
							password
						</label>
						<input
							value={passwordValue}
							onChange={(e) =>
								setPasswordValue(e.currentTarget.value)
							}
							required
							id="password"
							type="password"
							className="border-2 dark:border-0 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700"
						/>
					</div>
					{confirmPasswordStatus && (
						<div className="confirm-password">
							<label
								htmlFor="confirm-password"
								className="font-semibold dark:text-white"
							>
								confirm password
							</label>
							<input
								value={confirmPasswordValue}
								onChange={(e) =>
									setConfirmPasswordValue(
										e.currentTarget.value,
									)
								}
								required
								id="confirm-password"
								type="text"
								className="border-2 dark:border-0 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700"
							/>
						</div>
					)}
				</div>
				<div className="buttons flex justify-end gap-2">
					<button className="main-btn grid place-items-center dark:text-white">
						<Link
							className="w-full h-full grid place-items-center"
							to={".."}
						>
							cancel
						</Link>
					</button>
					<button
						className="main-btn dark:border-slate-700 border-2 dark:text-white"
						onClick={() => submit(true)}
					>
						sign up
					</button>
					<button
						onClick={() => submit(false)}
						className={`main-btn  dark:text-black text-white py-3 px-5 ${
							!confirmPasswordStatus &&
							(emailValue.length === 0 ||
								passwordValue.length === 0)
								? "bg-gray-500 dark:bg-gray-500 hover:bg-gray-500 dark:text-white"
								: "hover:bg-black bg-black dark:hover:bg-white dark:bg-white"
						}`}
						disabled={
							!confirmPasswordStatus &&
							(emailValue.length === 0 ||
								passwordValue.length === 0)
						}
					>
						log in
					</button>
				</div>
			</div>
		</div>
	)
}
