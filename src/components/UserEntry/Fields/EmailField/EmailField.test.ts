import { IsEmailValid } from './EmailField';

describe('IsEmailValid', () => {
	test('handles lack of @ symbol', () => {
		expect(IsEmailValid('nchaddy50')).toBe(false);
	});

	test('handles lack of .com', () => {
		expect(IsEmailValid('nchaddy50@protonmail')).toBe(false);
	});

	test('handles lack of domain', () => {
		expect(IsEmailValid('nchaddy50@.com')).toBe(false);
	});

	test('handles multiple @ symbols', () => {
		expect(IsEmailValid('nchaddy50@proton@mail.com')).toBe(false);
	});

	test('handles valid email addresses', () => {
		expect(IsEmailValid('nchaddy50@protonmail.com')).toBe(true);
	});

	test('handles non-.com addresses', () => {
		expect(IsEmailValid('nchaddy50@proton.me')).toBe(true);
	});
});
