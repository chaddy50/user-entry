import { defaultUnitedState } from '../../../../interfaces/UnitedState';
import { FindSelectedStateFromAbbreviation } from './StateField';

describe('FindSelectedStateFromAbbreviation', () => {
	const testStates = [
		{ name: 'Illinois', abbreviation: 'IL' },
		{ name: 'Wisconsin', abbreviation: 'WI' },
	];

	test('handles empty states array', () => {
		expect(FindSelectedStateFromAbbreviation([], 'WI')).toBe(
			defaultUnitedState
		);
	});

	test('handles invalid state abbreviation', () => {
		expect(FindSelectedStateFromAbbreviation(testStates, 'IN')).toBe(
			defaultUnitedState
		);
	});

	test('finds a valid state in array', () => {
		expect(FindSelectedStateFromAbbreviation(testStates, 'WI').name).toBe(
			'Wisconsin'
		);
	});
});
