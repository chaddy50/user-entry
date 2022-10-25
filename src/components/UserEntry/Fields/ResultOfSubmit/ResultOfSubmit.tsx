import React, { FunctionComponent } from 'react';
import User from '../../../../interfaces/User';

interface ResultOfSubmitProps {
	isError: boolean;
	user?: User;
}

const ResultOfSubmit: FunctionComponent<ResultOfSubmitProps> = (
	props: ResultOfSubmitProps
) => {
	const { isError, user } = props;
	return (
		<React.Fragment>{evaluateAndRenderResult(isError, user)}</React.Fragment>
	);
};

function evaluateAndRenderResult(isError: boolean, user: User | undefined) {
	if (isError) {
		return <p role='alert'>An error occurred attempting to create the user.</p>;
	} else {
		if (user) {
			return <p role='alert'>Successfully created user {user.name}.</p>;
		}
		return <React.Fragment />;
	}
}

export default ResultOfSubmit;
