import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import { Dispatch, SetStateAction, createContext } from "react"
import { useLocalStorage } from "usehooks-ts"

type emailType = {
	email: string
	password: string
}

type loginContextType = {
	loginData: emailType
	setLoginData: Dispatch<SetStateAction<emailType>>
}

export const LoginContext = createContext<loginContextType | null>(null)

export default function RootLayout() {
	const [loginData, setLoginData] = useLocalStorage("signingData", {
		email: "",
		password: "",
	})
	return (
		<>
			<LoginContext.Provider value={{ loginData, setLoginData }}>
				<Header />
				<Outlet />
			</LoginContext.Provider>
		</>
	)
}
