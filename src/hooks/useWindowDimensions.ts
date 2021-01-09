import { useCallback, useEffect, useState } from 'react';

export function useWindowDimensions(): [number, number] {
	const [dimensions, setDimensions] = useState<[number, number]>(() => {
		if (typeof window === "undefined") {
      return [0, 0];
    }

		return [window.innerWidth, window.innerHeight]
	});

	useEffect(() => {
		window.addEventListener('resize', onResize)

		return () => window.removeEventListener("resize", onResize);
	}, []);

	const onResize = useCallback(
		() => setDimensions([window.innerWidth, window.innerHeight]),
		[setDimensions]
	);

	return dimensions;
}