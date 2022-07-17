export interface TFormQuestion {
	fieldName: string;
	question: string;
	placeholder: string;
	isValid: (value: string | undefined) => boolean;
	pageElement: HTMLDivElement | undefined;
	inputElement: HTMLInputElement | HTMLTextAreaElement | undefined;
	inputError: boolean;
	inputType?: TInputType;
	inputElementType?: TInputElementType;
}

export interface TFormQuestionSubmitResult {
	data: any;
	error: string | null | undefined;
}

export interface TFormSuccessMessage {
	title: string;
	paragraph: string;
}

type TInputType = 'text' | 'number' | 'email' | 'password';
type TInputElementType = 'input' | 'textarea';
