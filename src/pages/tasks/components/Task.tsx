import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { task } from "../../../utils/types"
import {
	faArrowDown,
	faArrowLeft,
	faArrowUp,
	faEllipsis,
	faSuitcase,
} from "@fortawesome/free-solid-svg-icons"
import {
	faCheckCircle,
	faCompass,
	faUser,
} from "@fortawesome/free-regular-svg-icons"
import MenuList from "../../../components/ui/MenuList"
import Btn from "../../../components/ui/Btn"
import tasksStatus from "../../../constants/taskStatus"
import TaskMenuItem from "./TaskMenuItem"
import taskPriorities from "../../../constants/taskPriorities"
import { useState } from "react"
import taskCategories from "../../../constants/taskCategories"
import useTasks from "../../../contexts/useTasks"
import { useNavigate } from "react-router-dom"

export default function Task({
	title,
	status,
	priority,
	category,
	taskId,
}: task & { taskId: string }) {
	const navigate = useNavigate()
	const thClassNames =
		"h-full w-3/12 flex items-center justify-start dark:text-white"
	const [selectedStatus, setSelectedStatus] = useState(status)
	const [selectedPriority, setSelectedPriority] = useState(priority)
	const [selectedCategory, setSelectedCategory] = useState(category)
	const { setTasks } = useTasks()
	// TODO: make the edit button for changing the data of the task
	const taskStatusComponent =
		status === "todo" ? (
			<>
				<div className="w-4 h-4 border-2 border-black mr-1.5 dark:border-white"></div>
				{status}
			</>
		) : status === "done" ? (
			<>
				<FontAwesomeIcon
					icon={faCheckCircle}
					className="text-lg mr-1.5"
				/>
				{status}
			</>
		) : (
			status === "in progress" && (
				<>
					<FontAwesomeIcon
						icon={faCompass}
						className="text-lg mr-1.5"
					/>
					{status}
				</>
			)
		)
	const priorityStatusComponent =
		priority === "high" ? (
			<>
				<FontAwesomeIcon
					icon={faArrowUp}
					className="text-lg mr-1.5"
				/>
				{priority}
			</>
		) : priority === "medium" ? (
			<>
				<FontAwesomeIcon
					icon={faArrowLeft}
					className="text-lg mr-1.5"
				/>
				{priority}
			</>
		) : (
			priority === "low" && (
				<>
					<FontAwesomeIcon
						icon={faArrowDown}
						className="text-lg mr-1.5"
					/>
					{priority}
				</>
			)
		)
	const categoryStatusComponent =
		category === "work" ? (
			<>
				<FontAwesomeIcon
					icon={faSuitcase}
					className="text-lg mr-2"
				/>
				{category}
			</>
		) : (
			<>
				<FontAwesomeIcon icon={faUser} className="text-lg mr-2" />
				{category}
			</>
		)
	function delHandler() {
		setTasks((c) => {
			return c.filter((el) => el.id !== taskId)
		})
	}
	function editTaskHander() {
		navigate(`/tasks/${taskId}`)
	}
	return (
		<tr className="flex w-[50rem] sm:w-full h-16 gap-1 md:gap-4 border-b-2 dark:border-slate-700 px-4 md:px-8 transition duration-500 hover:bg-gray-100 hover:dark:bg-slate-800">
			<th className={thClassNames}>{title}</th>
			<th className={thClassNames}>{taskStatusComponent}</th>
			<th className={thClassNames}>{priorityStatusComponent}</th>
			<th className={thClassNames}>{categoryStatusComponent}</th>
			<th className={thClassNames}>
				<MenuList>
					<MenuList.ListBtn>
						<Btn As="div" style={"none"} className="p-1">
							<FontAwesomeIcon icon={faEllipsis} />
						</Btn>
					</MenuList.ListBtn>
					<MenuList.MenuItems className="w-fit">
						<TaskMenuItem<task["status"]>
							taskId={taskId}
							property="status"
							item={selectedStatus}
							setItem={setSelectedStatus}
							title="status"
							items={tasksStatus}
						/>
						<TaskMenuItem<task["priority"]>
							taskId={taskId}
							property="priority"
							item={selectedPriority}
							setItem={setSelectedPriority}
							title="priority"
							items={taskPriorities}
						/>
						<TaskMenuItem<task["category"]>
							property="category"
							taskId={taskId}
							item={selectedCategory}
							setItem={setSelectedCategory}
							title="category"
							items={taskCategories}
						/>
						<MenuList.MenuItem className="flex justify-start flex-col gap-4 w-fit pl-4">
							<button onClick={editTaskHander}>
								edit
							</button>
						</MenuList.MenuItem>
						<MenuList.MenuItem className="flex justify-start flex-col gap-4 w-fit pl-4">
							<button onClick={delHandler}>delete</button>
						</MenuList.MenuItem>
					</MenuList.MenuItems>
				</MenuList>
			</th>
		</tr>
	)
}
