import { useContext } from "react"
import { LoginContext } from "../layouts/RootLayout"

export default function useLogin() {
	const value = useContext(LoginContext)
	if (value === null)
		throw new Error("useLogin must be used within a useLoginProvider")
	return value
}
