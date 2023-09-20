import { Menu } from "@headlessui/react"
import useLogin from "../../../contexts/useLoginData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function UserBtn() {
	const login = useLogin()
	return (
		<>
			<Menu>
				{({ open }) => {
					return (
						<>
							<li className="w-full h-fit relative p-0">
								<Menu.Button
									className={
										"w-full h-11 flex gap-2 items-center"
									}
								>
									{login?.loginData?.email.length ===
									0 ? (
										<>
											<Link
												to="/login"
												className="main-btn w-full py-3 flex gap-2 items-center justify-between px-4"
											>
												login
											</Link>
										</>
									) : (
										<div className="main-btn flex items-center py-3 gap-2">
											<h3 className="user">
												{
													login
														?.loginData
														.email
												}
											</h3>
											<FontAwesomeIcon
												icon={faChevronDown}
												className={`text-sm transition ${
													open &&
													"rotate-180"
												}`}
											/>
										</div>
									)}
								</Menu.Button>
								{login?.loginData.email.length !==
									0 && (
									<>
										<Menu.Items>
											<div className="z-50 absolute bg-white shadow-lg flex flex-col rounded-lg p-1 top-12 dark:bg-slate-900 transition right-0">
												<Menu.Item>
													<Link
														to={
															"/jobs/my-listings"
														}
														className="w-full h-10 main-btn text-start pl-2 pr-14 rounded-md"
													>
														my listing
													</Link>
												</Menu.Item>
												<Menu.Item>
													<button
														className="w-full h-10 main-btn text-start pl-2 pr-14 rounded-md"
														onClick={() =>
															login?.setLoginData(
																{
																	email: "",
																	password:
																		"",
																},
															)
														}
													>
														logout
													</button>
												</Menu.Item>
											</div>
										</Menu.Items>
									</>
								)}
							</li>
						</>
					)
				}}
			</Menu>
		</>
	)
}
