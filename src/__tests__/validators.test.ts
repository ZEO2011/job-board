import { checkConfirmPassword, checkEmail, checkPassword } from "../validators"

describe("sign in/up validators", () => {
	it("#checkEmail fn", () => {
		const valid = "hatemziad384@gmail.com"
		expect(checkEmail(valid).length).toBe(0)
		const invalid = "asfgmsdfail."
		expect(checkEmail(invalid).length).toBeGreaterThan(0)
	})
	it("#checkPassword fn", () => {
		const valid = "ZeyadHatemZedan2011"
		expect(checkPassword(valid).length).toBe(0)
		const invalid = "sdf"
		expect(checkPassword(invalid).length).toBeGreaterThan(0)
	})
	it("#checkConfirmPassword fn", () => {
		const valid1 = "sf"
		const valid2 = "sf"
		expect(checkConfirmPassword(valid1, valid2).length).toBe(0)
		const invalid2 = "s"
		const invalid1 = "sf"
		expect(
			checkConfirmPassword(invalid2, invalid1).length,
		).toBeGreaterThan(0)
	})
})
