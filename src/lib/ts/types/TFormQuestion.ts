export interface TFormQuestion {
	fieldName: string;
	question: string;
	placeholder: string;
	isValid: (value: string | undefined) => boolean;
	pageElement: HTMLDivElement | undefined;
	inputElement: HTMLInputElement | undefined;
	inputError: boolean;
}

export interface TFormQuestionSubmitResult {
	data: any;
	error: string | null | undefined;
}
