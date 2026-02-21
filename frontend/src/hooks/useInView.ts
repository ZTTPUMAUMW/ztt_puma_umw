"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook that returns a ref and a boolean indicating whether the element is in the viewport.
 * Uses IntersectionObserver for performance-friendly scroll animations.
 *
 * @param options.threshold  - 0–1, how much of element must be visible (default: 0.1)
 * @param options.rootMargin - margin around viewport, e.g. "0px 0px -60px 0px" (default)
 * @param options.once       - if true, stops observing after first intersection (default: true)
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  // Initialise as `true` when the user prefers reduced motion so we never
  // animate at all — avoids calling setState synchronously inside an effect.
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible (reduced-motion initialised to true above)
    if (inView && once) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, inView]);

  return { ref, inView };
}
