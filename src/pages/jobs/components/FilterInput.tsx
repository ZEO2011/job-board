import classNames from "classnames"
import React, {
	ComponentPropsWithoutRef,
	Dispatch,
	ElementType,
	HTMLInputTypeAttribute,
	ReactNode,
	RefObject,
	SetStateAction,
} from "react"

type FilterInputType<T extends ElementType> = {
	caption: string
	inputType?: HTMLInputTypeAttribute
	custom?: boolean
	children?: ReactNode
	className?: string
	inputValue?: string
	setInputValue?: Dispatch<SetStateAction<string>>
	inputRef?: RefObject<HTMLInputElement>
	inputClassName?: string
	max?: number
	as?: React.ElementType // Add the 'as' prop for specifying the element type
	required?: boolean
	labelClassName?: string
	errors?: string[]
} & ComponentPropsWithoutRef<T>

export function FilterInput<T extends ElementType = "button">({
	caption,
	inputType,
	custom,
	children,
	className,
	inputValue,
	setInputValue,
	inputRef,
	inputClassName,
	as: Element = "input", // Default to 'input' element if 'as' prop is not provided
	max = Number.MAX_SAFE_INTEGER,
	required = false,
	labelClassName,
	errors = [],
	...restProps
}: FilterInputType<T>) {
	const containsErrors = errors.length > 0
	const parentClassName = classNames(
		"flex flex-col justify-start w-[28rem] h-fit gap-1.5",
		className,
	)
	const inputClassNames = classNames(
		`border-2 rounded-md h-12 px-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white ${
			containsErrors && "border-red-600 dark:border-red-600"
		}`,
		inputClassName,
	)
	const labelClassNames = classNames(
		`font-semibold text-lg ${
			containsErrors ? "text-red-600" : "dark:text-white"
		}`,
		labelClassName,
	)

	const InputElement = Element

	return (
		<div className={parentClassName}>
			<label htmlFor="input" className={labelClassNames}>
				{caption}
			</label>
			{!custom && (
				<>
					<InputElement
						required={required}
						{...restProps}
						maxLength={max}
						ref={inputRef}
						type={inputType}
						className={inputClassNames}
						value={inputValue}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>,
						) =>
							setInputValue &&
							setInputValue(e.target.value)
						}
					/>
					<p className="text-red-600 user">
						{errors?.join(", ")}
					</p>
				</>
			)}
			{children}
		</div>
	)
}
