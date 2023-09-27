import { useState } from "react"
import useTasks from "../../../contexts/useTasks"
import TableHeadItem from "./TableHeadItem"
import Task from "./Task"
export default function TasksTable() {
	const { tasks } = useTasks()
	const [titleFilter, setTitleFilter] = useState("")
	const [statusFilter, setStatusFilter] = useState("")
	const [priorityFilter, setPriorityFilter] = useState("")
	const [categoryFilter, setCategoryFilter] = useState("")
	const filteredTasks = tasks
		.sort((a, b) => {
			if (titleFilter === "asc") return a.title.localeCompare(b.title)
			if (titleFilter === "dsc") return b.title.localeCompare(a.title)
			return 0
		})
		.sort((a) => {
			if (statusFilter === "asc")
				return a.status === "done"
					? -2
					: a.status === "in progress"
					? -1
					: 1
			if (statusFilter === "dsc")
				return a.status === "todo"
					? -2
					: a.status === "in progress"
					? -1
					: 1
			return 0
		})
		.sort((a) => {
			if (priorityFilter === "asc")
				return a.priority === "high"
					? -2
					: a.priority === "medium"
					? -1
					: 1
			if (priorityFilter === "dsc")
				return a.priority === "low"
					? -2
					: a.priority === "medium"
					? -1
					: 1
			return 0
		})
		.sort((a) => {
			if (categoryFilter === "asc")
				return a.category === "personal" ? -1 : 1
			if (categoryFilter === "dsc")
				return a.category === "work" ? -1 : 1
			return 0
		})
	return (
		<div className="w-full h-fit pb-8">
			<table className="min-h-[25rem] overflow-hidden w-[min(95%,100%)] mt-4 border-2 dark:border-slate-700 mx-auto rounded-lg flex flex-col">
				<thead className="w-full h-fit md:pl-4 transition duration-500 border-b-2 dark:border-slate-700 rounded-t-lg hover:dark:bg-slate-800 hover:bg-gray-100">
					<tr className="flex w-full sm:w-[79%] h-16 gap-0 md:gap-4 px-4 pl-0 md:pr-8">
						<TableHeadItem
							className="left-0"
							setFilterValue={setTitleFilter}
						>
							title
						</TableHeadItem>
						<TableHeadItem
							className="left-0"
							setFilterValue={setStatusFilter}
						>
							status
						</TableHeadItem>
						<TableHeadItem setFilterValue={setPriorityFilter}>
							priority
						</TableHeadItem>
						<TableHeadItem setFilterValue={setCategoryFilter}>
							category
						</TableHeadItem>
					</tr>
				</thead>
				<tbody className="w-full min-h-[20.7rem] overflow-x-scroll sm:overflow-x-auto">
					{filteredTasks.map((task) => {
						return (
							<Task
								key={crypto.randomUUID()}
								taskId={task.id}
								{...task}
							/>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
