import UnitedState from './UnitedState';

export default interface Data {
	occupations: string[];
	states: UnitedState[];
}

export const defaultData: Data = {
	occupations: [],
	states: [],
};
