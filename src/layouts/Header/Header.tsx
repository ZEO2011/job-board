import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useDarkMode } from "usehooks-ts"
import { Menu } from "@headlessui/react"
import { Link } from "react-router-dom"
import UserBtn from "./components/UserBtn"

const DEFAULT_THEME = "(prefers-color-scheme: dark)"
export default function Header() {
	const {
		isDarkMode: dark,
		enable: enableDarkMode,
		disable: disableDarkMode,
	} = useDarkMode()
	const html = document.querySelector("html")
	html?.classList.add(dark ? "dark" : "light")
	html?.classList.remove(!dark ? "dark" : "light")
	return (
		<>
			<header className="border-b-2 dark:border-0 shadow-lg h-20 w-full flex justify-between items-center px-8 md:px-14 dark:bg-slate-800 dark:text-white">
				<h1 className="logo">job Board</h1>
				<nav className="w-fit h-full flex">
					<ul className="flex gap-2 text-lg h-full w-fit items-center justify-center">
						<Menu>
							<li className="w-fit h-fit main-btn relative p-0">
								<Menu.Button
									className={
										"w-11 h-11 grid place-items-center"
									}
								>
									<FontAwesomeIcon
										icon={dark ? faMoon : faSun}
									/>
								</Menu.Button>
								<Menu.Items>
									<div className="z-50 absolute bg-white shadow-lg flex flex-col rounded-lg p-1 top-12 dark:bg-slate-900 transition -left-20">
										<Menu.Item>
											<button
												className="w-full main-btn text-start pl-2 pr-14 rounded-md"
												onClick={
													disableDarkMode
												}
											>
												light
											</button>
										</Menu.Item>
										<Menu.Item>
											<button
												className="w-full main-btn text-start pl-2 pr-14 rounded-md"
												onClick={
													enableDarkMode
												}
											>
												dark
											</button>
										</Menu.Item>
										<Menu.Item>
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
										</Menu.Item>
									</div>
								</Menu.Items>
							</li>
						</Menu>
						<Menu>
							<li className="w-fit h-fit main-btn relative p-0 md:hidden block">
								<Menu.Button
									className={
										"w-11 h-11 grid place-items-center"
									}
								>
									<FontAwesomeIcon icon={faBars} />
								</Menu.Button>
								<Menu.Items>
									<div className="z-50 absolute bg-white shadow-lg flex flex-col rounded-lg p-1 top-12 dark:bg-slate-900 transition -right-1">
										<Menu.Item>
											<Link
												to="/tasks"
												className="w-full h-full main-btn"
											>
												tasks board
											</Link>
										</Menu.Item>
										<Menu.Item>
											<Link
												to="/jobs"
												className="w-full h-full main-btn"
											>
												Job listings
											</Link>
										</Menu.Item>
										<Menu.Item>
											<UserBtn />
										</Menu.Item>
									</div>
								</Menu.Items>
							</li>
						</Menu>
					</ul>
					<ul className="gap-2 text-lg h-full w-fit items-center justify-center md:flex hidden">
						<li className="w-fit h-fit main-btn">
							<Link className="w-full h-full" to="/tasks">
								tasks board
							</Link>
						</li>
						<li className="w-fit h-fit main-btn">
							<Link className="w-full h-full" to="/jobs">
								job listings
							</Link>
						</li>
						<UserBtn />
					</ul>
				</nav>
			</header>
		</>
	)
}
