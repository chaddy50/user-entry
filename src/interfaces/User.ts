import UnitedState, { defaultUnitedState } from './UnitedState';

export default interface User {
  name: string;
  email: string;
  password: string;
  occupation: string;
  state: UnitedState;
}

export const defaultUser = {
  name: '',
  email: '',
  password: '',
  occupation: '',
  state: defaultUnitedState,
};
