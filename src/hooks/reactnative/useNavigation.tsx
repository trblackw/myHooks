import { useContext } from 'react';
import { NavigationScreenProp, NavigationRoute, NavigationContext } from 'react-navigation';
import { Routes } from 'src/routes';

export default function useNavigation<P>(): {
	navigate: (route: Routes, params?: { [key: string]: string | number }) => void;
	getParam: {
		<T extends keyof P>(param: T, fallback: NonNullable<P[T]>): NonNullable<P[T]>;
		<T extends keyof P>(param: T): P[T];
	};
	goBack: (routeKey?: string | null | undefined) => boolean;
} {
	const { navigate, getParam, goBack } = useContext(NavigationContext) as NavigationScreenProp<
		NavigationRoute,
		P
	>;

	return {
		navigate: (route: Routes, params?: { [key: string]: string | number }) =>
			params ? navigate(route, params) : navigate(route),
		getParam,
		goBack
	};
}
