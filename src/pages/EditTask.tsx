import { Navigate, useLoaderData, useNavigate } from "react-router-dom"
import useLogin from "../contexts/useLoginData"
import { Input } from "../components/ui/Input"
import Caption from "../components/Caption"
import SelectList from "../components/ui/SelectList"
import taskCategories from "../constants/taskCategories"
import Btn from "../components/ui/Btn"
import { useState } from "react"
import { checkLength } from "../validators"
import tasksStatus from "../constants/taskStatus"
import taskPriorities from "../constants/taskPriorities"
import useTasks from "../contexts/useTasks"
import { task } from "../utils/types"
import { getTask } from "../utils/getTask"

export default function EditTask() {
	const loaderData = useLoaderData()
	const login = useLogin()
	const navigate = useNavigate()
	const { tasks, setTasks } = useTasks()
	const { title, status, priority, category } = getTask(
		tasks,
		`${loaderData}`,
	)
	const [titleValue, setTitleValue] = useState(title)
	const [statusValue, setStatusValue] = useState<task["status"]>(status)
	const getStatusValue = (name: task["status"]) => {
		if (statusValue !== name) setStatusValue(name)
	}
	const [priorityValue, setPriorityValue] =
		useState<task["priority"]>(priority)
	const getPriorityValue = (name: task["priority"]) => {
		if (priorityValue !== name) setPriorityValue(name)
	}
	const [categoryValue, setCategoryValue] =
		useState<task["category"]>(category)
	const getCategoryValue = (name: task["category"]) => {
		if (categoryValue !== name) setCategoryValue(name)
	}
	const [firstSubmit, setFirstSubmit] = useState(true)
	const titleErrors = checkLength(titleValue, "title", 1, 30)
	if (login.loginData.email === "") return <Navigate to={"/login"} />
	function formSubmit() {
		setFirstSubmit(false)
		if (!firstSubmit) {
			setTasks((c) => {
				return c.map((el) => {
					if (el.id === loaderData)
						return {
							title: titleValue,
							status: statusValue,
							priority: priorityValue,
							category: categoryValue,
							id: el.id,
						}
					return el
				})
			})
			return navigate("/tasks")
		}
	}
	return (
		<>
			<Caption caption="new task" withoutBtn />
			<div className="h-fit">
				<div className="w-full h-fit gap-6 grid grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 px-4 mb-4">
					<Input
						errors={!firstSubmit ? titleErrors : []}
						className="w-full"
						caption="title"
						setInputValue={setTitleValue}
						inputValue={titleValue}
					/>
					<div className="h-12 relative w-full">
						<p className="mb-2 text-lg dark:text-white font-semibold">
							status
						</p>
						<SelectList<{ name: task["status"]; id: number }>
							getValue={getStatusValue}
							className="top-12"
							btnClassName="w-full"
							items={tasksStatus
								.sort((el) => {
									if (el === status) return -1
									return 1
								})
								.map((el, index) => {
									return { name: el, id: index }
								})}
						/>
					</div>
					<div className="h-12 relative w-full">
						<p className="mb-2 text-lg dark:text-white font-semibold">
							priority
						</p>
						<SelectList
							getValue={getPriorityValue}
							className="top-12"
							btnClassName="w-full"
							items={taskPriorities
								.sort((el) => {
									if (el === priority) return -1
									return 1
								})
								.map((el, index) => {
									return { name: el, id: index }
								})}
						/>
					</div>
					<div className="h-12 relative w-full">
						<p className="mb-2 text-lg dark:text-white font-semibold">
							category
						</p>
						<SelectList
							getValue={getCategoryValue}
							className="top-12"
							btnClassName="w-full"
							items={taskCategories
								.sort((el) => {
									if (el === category) return -1
									return 1
								})
								.map((el, index) => {
									return { name: el, id: index }
								})}
						/>
					</div>
				</div>
				<div className="w-full flex justify-end pr-4">
					<Btn
						onClick={formSubmit}
						style={
							!firstSubmit && titleErrors.length > 0
								? "disabled"
								: "background"
						}
					>
						save
					</Btn>
				</div>
			</div>
		</>
	)
}
