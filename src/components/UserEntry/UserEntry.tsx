import { Button, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { defaultData } from '../../interfaces/Data';
import UnitedState, { defaultUnitedState } from '../../interfaces/UnitedState';
import User from '../../interfaces/User';
import '../../styles/UserEntry.css';
import EmailField, { IsEmailValid } from './Fields/EmailField/EmailField';
import OccupationField from './Fields/OccupationField/OccupationField';
import ResultOfSubmit from './Fields/ResultOfSubmit/ResultOfSubmit';
import StateField, {
	FindSelectedStateFromAbbreviation,
} from './Fields/StateField/StateField';

function UserEntry() {
	const [data, setData] = useState(defaultData);
	const [createdUser, setCreatedUser] = useState<User | undefined>(undefined);
	const [isErrorWithUserCreation, setIsErrorWithUserCreation] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [password, setPassword] = useState('');
	const [occupation, setOccupation] = useState('');
	const [state, setState] = useState(defaultUnitedState);

	useEffect(() => {
		fetch('https://frontend-take-home.fetchrewards.com/form')
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	const onEmailChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setIsEmailValid(IsEmailValid(event.target.value));
		setEmail(event.target.value);
	};

	const onOccupationChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setOccupation(event.target.value);
	};

	const onStateChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setState(
			FindSelectedStateFromAbbreviation(data.states, event.target.value)
		);
	};

	const onFormSubmitted = () => {
		const requestOptions = {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				name: name !== '' ? name : undefined,
				email: email !== '' ? email : undefined,
				password: password !== '' ? password : undefined,
				occupation: occupation !== '' ? occupation : undefined,
				state: state.abbreviation !== '' ? state : undefined,
			}),
		};

		fetch(
			'https://frontend-take-home.fetchrewards.com/form',
			requestOptions
		).then((response) => {
			if (response.status !== 201) {
				setIsErrorWithUserCreation(true);
			} else {
				response.json().then((createdUser) => {
					setCreatedUser(createdUser);
					setIsErrorWithUserCreation(false);
					resetForm();
				});
			}
		});
	};

	function resetForm(): void {
		setName('');
		setEmail('');
		setPassword('');
		setOccupation('');
		setState(defaultUnitedState);
	}

	return (
		<div className='userEntry'>
			<h1>Create a New User</h1>
			<TextField
				id='name'
				className='field'
				required
				label='Full name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<EmailField
				id='email'
				className='field'
				required
				email={email}
				isEmailValid={isEmailValid}
				onEmailChange={onEmailChange}
			/>
			<TextField
				id='password'
				className='field'
				required
				label='Password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<OccupationField
				id='occupation'
				className='field'
				required
				occupations={data.occupations}
				occupation={occupation}
				onOccupationChange={onOccupationChange}
			/>
			<StateField
				id='state'
				className='field stateField'
				required
				states={data.states}
				state={state}
				onStateChange={onStateChange}
			/>
			<Button
				id='submitButton'
				className='field'
				variant='contained'
				disabled={
					!shouldEnableSubmitButton(
						name,
						email,
						isEmailValid,
						password,
						occupation,
						state
					)
				}
				onClick={onFormSubmitted}
			>
				Submit
			</Button>
			<ResultOfSubmit isError={isErrorWithUserCreation} user={createdUser} />
		</div>
	);
}

export function shouldEnableSubmitButton(
	name: string,
	email: string,
	isEmailValid: boolean,
	password: string,
	occupation: string,
	state: UnitedState
): boolean {
	if (name === '') {
		return false;
	}
	if (email === '' || !isEmailValid) {
		return false;
	}
	if (password === '') {
		return false;
	}
	if (occupation === '') {
		return false;
	}
	if (state.abbreviation === '' || state.name === '') {
		return false;
	}
	return true;
}

export default UserEntry;
