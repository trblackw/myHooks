import { useState, useCallback } from 'react';

export default (initialValue) => {
	const [open, setOpen] = useState(initialValue);

	return [open, useCallback(() => setOpen(status => !status), [])];
};
