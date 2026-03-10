import {
    useState,
    useEffect,
    useRef
} from 'react';

export const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;
                setIsInView(inView);
                if (inView && !hasBeenInView) {
                    setHasBeenInView(true);
                }
            }, {
                threshold: 0.2,
                ...options
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options, hasBeenInView]);

    return {
        ref,
        isInView,
        hasBeenInView
    };
};