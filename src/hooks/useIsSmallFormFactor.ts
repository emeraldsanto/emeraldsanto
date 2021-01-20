import { useCallback, useLayoutEffect, useState } from 'react';

const TARGET_WIDTH = 815;
const MEDIA_QUERY = `(max-width: ${TARGET_WIDTH}px)`;

export function useIsSmallFormFactor(): boolean {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback(
		() => setTargetReached(window.matchMedia(MEDIA_QUERY).matches),
		[setTargetReached]
	);

	useLayoutEffect(() => {
		const media = window.matchMedia(MEDIA_QUERY);
		
		// @ts-ignore
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

		// @ts-ignore
    return () => media.removeEventListener("change", updateTarget);
  }, [updateTarget]);
	
	return targetReached;
}