import { MenuItem, TextField } from '@mui/material';
import { FunctionComponent } from 'react';
import UnitedState, {
	defaultUnitedState,
} from '../../../../interfaces/UnitedState';

interface StateFieldProps {
	id: string;
	className?: string;
	required: boolean;
	states: UnitedState[];
	state: UnitedState;
	onStateChange(event: any): void;
}

const StateField: FunctionComponent<StateFieldProps> = (
	props: StateFieldProps
) => {
	const { id, className, required, states, state, onStateChange } = props;
	return (
		<TextField
			select
			id={id}
			className={className}
			required={required}
			label='State'
			value={state.abbreviation}
			onChange={onStateChange}
		>
			{states.map((unitedState) => {
				return (
					<MenuItem
						key={unitedState.abbreviation}
						value={unitedState.abbreviation}
					>
						{unitedState.abbreviation}
					</MenuItem>
				);
			})}
		</TextField>
	);
};

export function FindSelectedStateFromAbbreviation(
	states: UnitedState[],
	selectedAbbrevation: string
) {
	const index = states.findIndex(
		(state) => state.abbreviation === selectedAbbrevation
	);
	if (index !== -1) {
		return states[index];
	}
	return defaultUnitedState;
}

export default StateField;
