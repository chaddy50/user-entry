import { MenuItem, TextField } from '@mui/material';
import { FunctionComponent } from 'react';

interface OccupationFieldProps {
	id: string;
	className?: string;
	required: boolean;
	occupations: string[];
	occupation: string;
	onOccupationChange(event: any): void;
}

const OccupationField: FunctionComponent<OccupationFieldProps> = (
	props: OccupationFieldProps
) => {
	const {
		id,
		className,
		required,
		occupation,
		occupations,
		onOccupationChange,
	} = props;
	return (
		<TextField
			select
			id={id}
			className={className}
			required={required}
			label='Occupation'
			value={occupation}
			onChange={onOccupationChange}
		>
			{occupations.map((occupation) => {
				return (
					<MenuItem key={occupation} value={occupation}>
						{occupation}
					</MenuItem>
				);
			})}
		</TextField>
	);
};

export default OccupationField;
