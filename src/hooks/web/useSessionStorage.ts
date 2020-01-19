import { useState, useEffect } from 'react';

export default (key: string, initialValue: string): (string | ((value: any) => void) | null)[] => {
	const { sessionStorage, addEventListener, removeEventListener } = window;
	if (sessionStorage.getItem(key) === null) {
		sessionStorage.setItem(key, initialValue);
	}
	const prevSessionStorageValue = sessionStorage.getItem(key);
	const [localState, updateLocalState] = useState(prevSessionStorageValue);
	const sessionStorageChange = (e: StorageEvent) => {
		if (e.key === key) {
			updateLocalState(e.newValue);
		}
	};
	const setLocalState = (value: string) => {
		sessionStorage.setItem(key, value);
		updateLocalState(value);
	};

	useEffect(() => {
		addEventListener('storage', sessionStorageChange);

		return () => removeEventListener('storage', sessionStorageChange);
	});
	return [localState, setLocalState];
};
