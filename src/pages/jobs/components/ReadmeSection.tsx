import ReactMarkdown from "react-markdown"
import "../../../assets/styles/ReadmeSection.css"
import { NormalComponents } from "react-markdown/lib/complex-types"
import { SpecialComponents } from "react-markdown/lib/ast-to-react"

type ReadmeSectionType = {
	children: string
	components: Partial<
		Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
	>
}
export default function ReadmeSection({
	children,
	components,
}: ReadmeSectionType) {
	return (
		<div className="readme-section">
			<ReactMarkdown components={components}>{children}</ReactMarkdown>
		</div>
	)
}
