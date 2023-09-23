import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useLogin from "../contexts/useLoginData"
import { checkConfirmPassword, checkEmail, checkPassword } from "../validators"
import Btn from "../components/ui/Btn"

export default function Login() {
	const navigate = useNavigate()
	const login = useLogin()
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
	const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false)
	const [firstSubmit, setFirstSubmit] = useState(true)
	const emailErrors = !firstSubmit ? checkEmail(emailValue) : []
	const passwordErrors = !firstSubmit ? checkPassword(passwordValue) : []
	const confirmErrors = !firstSubmit
		? checkConfirmPassword(passwordValue, confirmPasswordValue)
		: []
	const errors = emailErrors.length + passwordErrors.length
	const signUpErrors =
		emailErrors.length + passwordErrors.length + confirmErrors.length
	function submit(confirm: boolean = false) {
		setFirstSubmit(false)
		if (confirm != confirmPasswordStatus) setFirstSubmit(true)
		setConfirmPasswordStatus(confirm)
		if (!firstSubmit)
			if (errors == 0) {
				login?.setLoginData({
					email: emailValue,
					password: passwordValue,
				})
				return navigate("/jobs")
			}
	}
	return (
		<div className="w-full h-[calc(100%-5rem)] px-4 grid place-items-center">
			<div className="w-[min(28rem,100%)] min-h-[23rem] rounded-lg shadow-lg p-6 dark:bg-slate-800 relative">
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
							className={`font-semibold ${
								!firstSubmit && emailErrors.length !== 0
									? "text-red-600"
									: "dark:text-white"
							}`}
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
							className={`border-2 mb-2 bg-main ${
								emailErrors
									? emailErrors.length > 0
										? "border-error dark:border-error"
										: "dark:border-slate-700"
									: "dark:border-slate-700"
							} dark:border-2 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700`}
						/>
						<p className="text-red-600">
							{emailErrors.join(", ")}
						</p>
					</div>
					<div className="password">
						<label
							htmlFor="password"
							className={`font-semibold ${
								!firstSubmit &&
								passwordErrors.length !== 0
									? "text-red-600"
									: "dark:text-white"
							}`}
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
							className={`border-2 mb-2 bg-main ${
								passwordErrors
									? passwordErrors.length > 0
										? "border-error dark:border-error"
										: "dark:border-slate-700"
									: "dark:border-slate-700"
							} dark:border-2 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700`}
						/>
						<p className="text-red-600">
							{passwordErrors.join(", ")}
						</p>
					</div>
					{confirmPasswordStatus && (
						<div className="confirm-password">
							<label
								htmlFor="confirm-password"
								className={`font-semibold ${
									!firstSubmit &&
									confirmErrors.length !== 0
										? "text-red-600"
										: "dark:text-white"
								}`}
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
								className={`border-2 mb-2 bg-main ${
									confirmErrors
										? confirmErrors.length > 0
											? "border-error dark:border-error"
											: "dark:border-slate-700"
										: "dark:border-slate-700"
								} dark:border-2 dark:text-white w-full h-10 rounded-md mt-2 pl-2 dark:bg-slate-700`}
							/>
							<p className="text-red-600">
								{confirmErrors.join(", ")}
							</p>
						</div>
					)}
				</div>
				<div className="buttons flex justify-end gap-2">
					<Btn style={"none"} to="..">
						cancel
					</Btn>
					<Btn
						style={"border"}
						onClick={() => submit(true)}
						disabled={
							confirmPasswordStatus
								? signUpErrors
									? signUpErrors > 0
									: false
								: false
						}
					>
						sign up
					</Btn>
					<Btn
						className="px-5"
						onClick={() => submit(false)}
						disabled={
							!confirmPasswordStatus
								? errors
									? errors > 0
									: false
								: false
						}
					>
						login
					</Btn>
				</div>
			</div>
		</div>
	)
}
