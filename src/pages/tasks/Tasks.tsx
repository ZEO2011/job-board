import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Caption from "../../components/Caption"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import TasksTable from "./components/TasksTable"

export default function Tasks() {
	return (
		<>
			<Caption
				caption="tasks"
				buttonCaption={
					<div className="flex gap-2 items-center">
						<FontAwesomeIcon icon={faPlus} />
						task
					</div>
				}
				to="/tasks/new"
			/>
			<TasksTable />
		</>
	)
}
