import { useState, useCallback } from 'react';

export default () => {
	const [open, setOpen] = useState(false);

	return [open, useCallback(() => setOpen(status => !status))];
};
