import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

type ToValue = number | Animated.AnimatedValue | { x: number; y: number } | Animated.AnimatedValueXY;

const useAnimatedValue = (initialValue: number): Animated.Value => {
	const ref = useRef(new Animated.Value(initialValue));
	return ref.current;
};

type AnimationType = 'fade'; //can add more if needed

interface BaseAnimationConfig {
	initialValue?: number;
	type?: AnimationType;
}

type TimingAnimationConfig = BaseAnimationConfig & ({ type: 'fade' } & Animated.TimingAnimationConfig);

const getInitialValue = (config: TimingAnimationConfig): ToValue => {
	return typeof config.initialValue !== 'undefined' ? config.initialValue : (config.toValue as ToValue);
};

export const useAnimation = (config: TimingAnimationConfig): Animated.Value => {
	const animatedValue = useAnimatedValue(Number(getInitialValue(config)));
	const animate = () => Animated.timing(animatedValue, config).start();
	useEffect(animate, [config.toValue]);

	return animatedValue;
};
