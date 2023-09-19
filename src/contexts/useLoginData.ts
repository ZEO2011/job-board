import { useContext } from "react"
import { LoginContext } from "../layouts/RootLayout"

export default function useLogin() {
	const value = useContext(LoginContext)
	if (value === null) return
	return value
}
