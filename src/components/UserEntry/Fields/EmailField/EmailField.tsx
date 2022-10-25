import { TextField } from '@mui/material';
import { FunctionComponent } from 'react';

interface EmailFieldProps {
	id: string;
	className?: string;
	required: boolean;
	email: string;
	isEmailValid: boolean;
	onEmailChange(event: any): void;
}

const EmailField: FunctionComponent<EmailFieldProps> = (
	props: EmailFieldProps
) => {
	const { id, className, required, email, isEmailValid, onEmailChange } = props;
	return (
		<TextField
			id={id}
			className={className}
			required={required}
			label='Email address'
			value={email}
			error={!isEmailValid}
			onChange={onEmailChange}
		/>
	);
};

export function IsEmailValid(email: string): boolean {
	if (email === '') {
		return true;
	}
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default EmailField;
