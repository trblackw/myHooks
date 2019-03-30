import { useState } from 'react';

export default initialValue => {
	const [value, setValue] = useState(initialValue);
	return {
		value,
		onChange: e => {
			setValue(e.target.value);
		}
	};
};
