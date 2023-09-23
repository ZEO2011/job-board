import axios, { AxiosRequestConfig } from "axios"

export default async function getCountries(options?: AxiosRequestConfig) {
	const value = await axios
		.get("https://restcountries.com/v3.1/all", options)
		.then((res) => res.data)
	const countries = value.map((country: { name: { common: string } }) => {
		return country.name.common
	})
	return [...countries, "remote"]
}
