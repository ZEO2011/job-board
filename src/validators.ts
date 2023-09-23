export function checkEmail(email: string) {
	const errors = []
	if (!email.includes("@")) errors.push("must include @")
	if (email.split("@")[0].length <= 4)
		errors.push(
			"the email should be more than 4 chars (fourchars@mail.com)",
		)
	try {
		if (email.split("@")[1].length < 4)
			errors.push("the email should contain (outlook, gmail, etc.) ")
	} catch {
		errors.push("the email should contain (outlook, gmail, etc.) ")
	}
	try {
		if (email.split("@")[1].split(".")[1].length < 2)
			errors.push("the email should contain (com, co, etc.) ")
	} catch {
		errors.push("the email should contain (com, co, etc.) ")
	}
	return errors
}

export function checkPassword(password: string) {
	const errors = []
	if (password.length <= 8) errors.push("must be more than 7 chars")
	if (password.split("").filter((el) => !isNaN(parseInt(el))).length === 0)
		errors.push("must contain a number")
	return errors
}

export function checkConfirmPassword(pass1: string, pass2: string) {
	const errors = []
	if (pass1 != pass2) {
		errors.push("the confirm password doesn't the same as the password")
	}
	return errors
}
