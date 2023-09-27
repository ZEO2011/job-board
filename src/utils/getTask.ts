import { task } from "./types"

export function getTask(tasks: task[], taskId: string) {
	return tasks.filter((el) => {
		return el.id === taskId
	})[0]
}
