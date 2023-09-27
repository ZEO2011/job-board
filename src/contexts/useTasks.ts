import { useContext } from "react"
import { TasksContext } from "../layouts/RootLayout"

export default function useTasks() {
	const value = useContext(TasksContext)
	if (value === null || value === undefined) {
		throw new Error("useTasks must be used within a TasksProvider")
	}
	return value
}
