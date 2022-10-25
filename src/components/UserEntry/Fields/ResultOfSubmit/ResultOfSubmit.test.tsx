import { render, screen } from '@testing-library/react';
import User from '../../../../interfaces/User';
import ResultOfSubmit from './ResultOfSubmit';

const testUser: User = {
	name: 'Nathan',
	email: 'nchaddy50@protonmail.com',
	password: 'asdf',
	occupation: 'Job',
	state: { name: 'Wisconsin', abbreviation: 'WI' },
};

describe('ResultOfSubmit', () => {
	test('renders nothing without a user or error', async () => {
		render(<ResultOfSubmit isError={false} user={undefined} />);

		expect(screen.queryByRole('alert')).toBeNull();
	});

	test('renders error message if isError is true and no valid user provided', async () => {
		render(<ResultOfSubmit isError={true} user={undefined} />);

		expect(screen.getByRole('alert')).toHaveTextContent(
			'An error occurred attempting to create the user.'
		);
	});

	test('renders error message when isError is true even if valid user is provided', async () => {
		render(<ResultOfSubmit isError={true} user={testUser} />);

		expect(screen.getByRole('alert')).toHaveTextContent(
			'An error occurred attempting to create the user.'
		);
	});

	test('renders success message when isError is false and valid user provided', async () => {
		render(<ResultOfSubmit isError={false} user={testUser} />);

		expect(screen.getByRole('alert')).toHaveTextContent(
			'Successfully created user Nathan'
		);
	});
});
