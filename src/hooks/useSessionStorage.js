import { useState, useEffect } from 'react';

export default (key, initialValue) => {
	const { sessionStorage, addEventListener, removeEventListener } = window;
	if (sessionStorage.getItem(key) === null) {
		sessionStorage.setItem(key, initialValue);
	}
	const prevSessionStorageValue = sessionStorage.getItem(key);
	const [localState, updateLocalState] = useState(prevSessionStorageValue);
	const sessionStorageChange = e => {
		if (e.key === key) {
			updateLocalState(e.newValue);
		}
	};
	const setLocalState = value => {
		sessionStorage.setItem(key, value);
		updateLocalState(value);
	};

	useEffect(() => {
		addEventListener('storage', sessionStorageChange);

		return () => removeEventListener('storage', sessionStorageChange);
	});
	return [localState, setLocalState];
};
