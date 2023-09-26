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

export function checkLength(
	text: string,
	title?: string,
	greaterThan?: number,
	lowerThan?: number,
) {
	const errors = []
	if (lowerThan)
		if (text.length > lowerThan)
			errors.push(`the ${title} must be lower than ${lowerThan} chars`)
	if (greaterThan) {
		if (greaterThan <= 1) {
			if (text.length == 0)
				errors.push(`the ${title} shouldn't be empty`)
		} else {
			if (text.length < greaterThan) {
				errors.push(
					`the ${title} must be greater than ${greaterThan} chars`,
				)
			}
		}
	}
	return errors
}

export function checkURL(url: string) {
	const errors = []
	const httpRegex = /(http:\/\/|https:\/\/|www.)/gi
	if (!httpRegex.test(url))
		errors.push("the URL should contain https:// or http:// or www.")
	const URLNameRegex = /(?:https?:\/\/|www\.)\S+/gi
	if (!URLNameRegex.test(url)) {
		errors.push("the URL should contain a domain name")
	}
	const extensionNameRegex = /[.][a-zA-Z0-9]{1,10}/gi
	if (!extensionNameRegex.test(url))
		errors.push("the URL should contain a extension name")
	return errors
}

export function checkNumber(
	num: string,
	text: string,
	greaterThan?: number,
	lowerThan?: number,
) {
	const errors = []
	if (greaterThan)
		if (+num <= greaterThan)
			errors.push(`the ${text} should be greater than ${greaterThan}$`)
	if (lowerThan)
		if (+num >= lowerThan)
			errors.push(`the ${text} should be greater than ${lowerThan}`)
	return errors
}
