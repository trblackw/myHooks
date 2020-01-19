import { useState, useCallback } from 'react';

export default (initialValue: boolean): [boolean, () => void] => {
	const [open, setOpen] = useState<boolean>(initialValue);

	return [open, useCallback(() => setOpen(status => !status), [])];
};
