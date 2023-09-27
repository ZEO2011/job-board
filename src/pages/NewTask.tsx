import { Navigate, useNavigate } from "react-router-dom"
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

export default function NewTask() {
	const login = useLogin()
	const navigate = useNavigate()
	const { setTasks } = useTasks()
	const [titleValue, setTitleValue] = useState("")
	const [statusValue, setStatusValue] = useState<task["status"]>("todo")
	const getStatusValue = (name: task["status"]) => setStatusValue(name)
	const [priorityValue, setPriorityValue] =
		useState<task["priority"]>("high")
	const getPriorityValue = (name: task["priority"]) => setPriorityValue(name)
	const [categoryValue, setCategoryValue] =
		useState<task["category"]>("personal")
	const getCategoryValue = (name: task["category"]) => setCategoryValue(name)
	const [firstSubmit, setFirstSubmit] = useState(true)
	const titleErrors = checkLength(titleValue, "title", 1, 30)
	if (login.loginData.email === "") return <Navigate to={"/login"} />
	function formSubmit() {
		setFirstSubmit(false)
		if (!firstSubmit) {
			setTasks((c) => {
				return [
					...c,
					{
						title: titleValue,
						category: categoryValue,
						status: statusValue,
						priority: priorityValue,
						id: crypto.randomUUID(),
					},
				]
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
								.map((el, index) => {
									return { name: el, id: index }
								})
								.reverse()}
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
							items={taskPriorities.map((el, index) => {
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
							items={taskCategories.map((el, index) => {
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
