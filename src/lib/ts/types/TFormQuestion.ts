export interface TFormQuestion {
	fieldName: string;
	question: string;
	placeholder: string;
	isValid: (value: string | undefined) => boolean;
	pageElement: HTMLDivElement | undefined;
	inputElement: HTMLInputElement | HTMLTextAreaElement | undefined;
	inputError: boolean;
	inputType?: TInputType;
	inputSize?: TInputSize;
}

export interface TFormQuestionSubmitResult {
	data: any;
	error: string | null | undefined;
}

type TInputType = 'text' | 'number' | 'email' | 'password';
type TInputSize = 'input' | 'textarea';
