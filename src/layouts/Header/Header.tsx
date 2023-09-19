import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import Dialog from "../../components/Dialog"
import { Link } from "react-router-dom"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useBoolean, useDarkMode } from "usehooks-ts"
import LoginBtn from "./components/LoginBtn"
import MobileLoginBtn from "./components/MobileLoginBtn"

const DEFAULT_THEME = "(prefers-color-scheme: dark)"
export default function Header() {
	const { value: themeStatus, setValue: setThemeStatus } = useBoolean(false)
	const {
		isDarkMode: dark,
		enable: enableDarkMode,
		disable: disableDarkMode,
	} = useDarkMode()
	const { value: profileStatus, setValue: setProfileStatus } =
		useBoolean(false)
	const { value: phoneNavlinksStatus, setValue: setPhoneNavlinksStatus } =
		useBoolean(false)
	const phoneNavlinksRef = useRef<HTMLLIElement>(null)
	const html = document.querySelector("html")
	html?.classList.add(dark ? "dark" : "light")
	html?.classList.remove(!dark ? "dark" : "light")
	function themeToggle() {
		if (profileStatus || phoneNavlinksStatus) {
			setProfileStatus(false)
			setPhoneNavlinksStatus(false)
		}
		setThemeStatus((c) => !c)
	}
	function profile() {
		if (themeStatus) {
			setThemeStatus(false)
		}
		setProfileStatus((c) => !c)
	}
	function togglePhoneNavLinks(e: React.MouseEvent) {
		if (themeStatus) {
			setThemeStatus(false)
		}
		if (e.currentTarget.classList.contains("hide")) {
			setPhoneNavlinksStatus(false)
			e.currentTarget.classList.remove("hide")
		} else setPhoneNavlinksStatus(true)
	}
	function hidePhoneNavlinks() {
		phoneNavlinksRef.current?.classList.add("hide")
	}
	return (
		<>
			<header className="border-b-2 dark:border-0 shadow-lg h-20 w-full flex justify-between items-center px-8 md:px-14 dark:bg-slate-800 dark:text-white">
				<h1 className="logo">job Board</h1>
				<nav className="w-fit h-full flex">
					<ul className="flex gap-2 text-lg h-full w-fit items-center justify-center">
						<li
							className="w-fit h-fit main-btn relative"
							onClick={themeToggle}
						>
							<button>
								<FontAwesomeIcon
									icon={dark ? faMoon : faSun}
								/>
								{themeStatus && (
									<Dialog className="-left-20">
										<button
											className="w-full main-btn text-start pl-2 pr-14 rounded-md"
											onClick={disableDarkMode}
										>
											light
										</button>
										<button
											className="w-full main-btn text-start pl-2 pr-14 rounded-md"
											onClick={enableDarkMode}
										>
											dark
										</button>
										<button
											className="w-full main-btn text-start pl-2 pr-14 rounded-md"
											onClick={
												DEFAULT_THEME
													? enableDarkMode
													: disableDarkMode
											}
										>
											system
										</button>
									</Dialog>
								)}
							</button>
						</li>
						<li
							className="menu w-fit h-fit main-btn relative md:hidden block"
							onClick={togglePhoneNavLinks}
							ref={phoneNavlinksRef}
						>
							<button>
								<FontAwesomeIcon icon={faBars} />
								{phoneNavlinksStatus && (
									<ul className="flex text-sm relative right-12 -top-7  h-full w-fit items-end justify-center flex-col">
										<Dialog className="w-fit h-fit">
											<li
												className=" h-fit main-btn w-full text-start"
												onClick={
													hidePhoneNavlinks
												}
											>
												<Link
													className="w-full h-full"
													to="/tasks"
												>
													task board
												</Link>
											</li>
											<li
												className=" h-fit main-btn w-full text-start"
												onClick={
													hidePhoneNavlinks
												}
											>
												<Link
													className="w-full h-full"
													to="/jobs"
												>
													job listing
												</Link>
											</li>
											<li
												className=" h-fit main-btn w-full text-start user relative"
												onClick={() => {
													setProfileStatus(
														(c) => !c,
													)
												}}
											>
												<MobileLoginBtn
													profileStatus={
														profileStatus
													}
												/>
											</li>
										</Dialog>
									</ul>
								)}
							</button>
						</li>
					</ul>
					<ul className="gap-2 text-lg h-full w-fit items-center justify-center md:flex hidden">
						<li className="w-fit h-fit main-btn">
							<Link className="w-full h-full" to="/tasks">
								task board
							</Link>
						</li>
						<li className="w-fit h-fit main-btn">
							<Link className="w-full h-full" to="/jobs">
								job listing
							</Link>
						</li>
						<li
							className="w-fit h-fit main-btn user relative"
							onClick={profile}
						>
							<LoginBtn profileStatus={profileStatus} />
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}
