import LoginBtn from "./LoginBtn"

export default function MobileLoginBtn({
	profileStatus,
}: {
	profileStatus: boolean
}) {
	return <LoginBtn profileStatus={profileStatus} />
}
