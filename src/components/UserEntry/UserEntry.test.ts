import { shouldEnableSubmitButton } from './UserEntry';

describe('shouldEnableSubmitButton', () => {
	const testName = 'Nathan';
	const testEmail = 'nchaddy50@protonmail.com';
	const testPassword = 'asdf';
	const testOccupation = 'job';
	const testState = { name: 'Wisconsin', abbreviation: 'WI' };

	test('returns false if name is missing', () => {
		expect(
			shouldEnableSubmitButton(
				'',
				testEmail,
				true,
				testPassword,
				testOccupation,
				testState
			)
		).toBe(false);
	});

	test('returns false if email is missing', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				'',
				true,
				testPassword,
				testOccupation,
				testState
			)
		).toBe(false);
	});

	test('returns false if email is invalid, even if all other fields are provided', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				false,
				testPassword,
				testOccupation,
				testState
			)
		).toBe(false);
	});

	test('returns false if password is missing', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				true,
				'',
				testOccupation,
				testState
			)
		).toBe(false);
	});

	test('returns false if occupation is missing', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				true,
				testPassword,
				'',
				testState
			)
		).toBe(false);
	});

	test('returns false if state is missing abbreviation', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				true,
				testPassword,
				testOccupation,
				{ name: 'Wisconsin', abbreviation: '' }
			)
		).toBe(false);
	});

	test('returns false if state is missing name', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				true,
				testPassword,
				testOccupation,
				{ name: '', abbreviation: 'WI' }
			)
		).toBe(false);
	});

	test('returns true if all fields are provided and email is valid', () => {
		expect(
			shouldEnableSubmitButton(
				testName,
				testEmail,
				true,
				testPassword,
				testOccupation,
				testState
			)
		).toBe(true);
	});
});
