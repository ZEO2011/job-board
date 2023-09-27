import { useContext } from "react"
import { JobListingsContext } from "../layouts/RootLayout"

export default function useJobListings() {
	const value = useContext(JobListingsContext)
	if (value === null || value === undefined) {
		throw new Error(
			"useJobListings must be used within a JobListingsProvider",
		)
	}
	return value
}
