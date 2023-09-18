import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Dialog from "../components/Dialog"
import { Link } from "react-router-dom"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
	const defaultTheme = window.matchMedia("(prefers-color-scheme)").matches
	const [themeStatus, setThemeStatus] = useState(false)
	const [dark, setDark] = useState(defaultTheme)
	const [profileStatus, setProfileStatus] = useState(false)
	const [phoneNavlinksStatus, setPhoneNavlinksStatus] = useState(false)
	const html = document.querySelector("html")
	html?.classList.add(dark ? "dark" : "light")
	html?.classList.remove(!dark ? "dark" : "light")
	useEffect(() => {
		const local = localStorage.getItem("dark")
		if (local !== null) {
			const bol: boolean = eval(local)
			setDark(bol)
		}
	}, [])
	function themeToggle() {
		if (profileStatus || phoneNavlinksStatus) {
			setProfileStatus(false)
			setPhoneNavlinksStatus(false)
		}
		setThemeStatus((c) => !c)
	}
	function changeTheme(theme: boolean) {
		setDark(theme)
		localStorage.setItem("dark", `${theme}`)
	}
	function profile() {
		if (themeStatus) {
			setThemeStatus(false)
		}
		setProfileStatus((c) => !c)
	}
	function togglePhoneNavLinks() {
		if (themeStatus) {
			setThemeStatus(false)
		}
		setProfileStatus(false)
		setPhoneNavlinksStatus((c) => !c)
	}
	return (
		<>
			<header className="border-b-2 dark:border-0 shadow-lg h-20 w-full flex justify-between items-center px-14 dark:bg-slate-800 dark:text-white">
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
									<Dialog>
										<button
											className="w-full main-btn text-start pl-2 pr-8 rounded-md"
											onClick={() =>
												changeTheme(false)
											}
										>
											light
										</button>
										<button
											className="w-full main-btn text-start pl-2 pr-8 rounded-md"
											onClick={() =>
												changeTheme(true)
											}
										>
											dark
										</button>
										<button
											className="w-full main-btn text-start pl-2 pr-8 rounded-md"
											onClick={() =>
												changeTheme(
													defaultTheme,
												)
											}
										>
											system
										</button>
									</Dialog>
								)}
							</button>
						</li>
						<li
							className="w-fit h-fit main-btn relative md:hidden block"
							onClick={togglePhoneNavLinks}
						>
							<button>
								<FontAwesomeIcon icon={faBars} />
								{phoneNavlinksStatus && (
									<ul className="flex text-sm absolute right-36 top-0  h-full w-fit items-end justify-center flex-col">
										<Dialog className="w-fit h-fit">
											<li className=" h-fit main-btn w-full text-start">
												<Link to="/tasks">
													task board
												</Link>
											</li>
											<li className=" h-fit main-btn w-full text-start">
												<Link to="/jobs">
													job listing
												</Link>
											</li>
											<li
												className=" h-fit main-btn w-full text-start user relative"
												onMouseOver={() =>
													setProfileStatus(
														true,
													)
												}
											>
												<button className="flex gap-2 items-center justify-between py-1">
													hatemziad384@gmail.com
													<FontAwesomeIcon
														icon={
															faChevronDown
														}
														className={`text-sm transition ${
															profileStatus &&
															"rotate-180"
														}`}
													/>
												</button>
												{profileStatus && (
													<Dialog className="left-[40%] w-32">
														<button className="main-btn text-start pl-2 py-2">
															my
															listing
														</button>
														<button className="main-btn text-start pl-2 py-2">
															logout
														</button>
													</Dialog>
												)}
											</li>
										</Dialog>
									</ul>
								)}
							</button>
						</li>
					</ul>
					<ul className="gap-2 text-lg h-full w-fit items-center justify-center md:flex hidden">
						<li className="w-fit h-fit main-btn">
							<Link to="/tasks">task board</Link>
						</li>
						<li className="w-fit h-fit main-btn">
							<Link to="/jobs">job listing</Link>
						</li>
						<li
							className="w-fit h-fit main-btn user relative"
							onClick={profile}
						>
							<button className="flex gap-2 items-center justify-between py-1">
								test@gmail.com
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
									<button className="main-btn text-start pl-2 py-2 pr-8">
										logout
									</button>
								</Dialog>
							)}
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}
