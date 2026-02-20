"use client";

import { useState, useRef, useCallback, TouchEvent, MouseEvent, useEffect } from "react";
import FeaturedBanner from "./FeaturedBanner";
import styles from "@/styles/components/banner-slider.module.scss";

// TODO: Refactor to use a SanityCMS query to fetch banner slides dynamically, and add support for different slide types (e.g. video, carousel) in the future.

export interface BannerSlide {
  image: string;
  title: string;
  description: string;
  link: string;
  alt?: string;
}

interface BannerSliderProps {
  slides: BannerSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
}

export default function BannerSlider({
  slides,
  autoplay = true,
  autoplayDelay = 4000,
  loop = true,
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translatePosition, setTranslatePosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const stopOnInteraction = useRef(false);
  const hasMoved = useRef(false);
  const isMouseDown = useRef(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      let targetIndex = index;

      // Handle loop
      if (loop) {
        if (index < 0) {
          targetIndex = slides.length - 1;
        } else if (index >= slides.length) {
          targetIndex = 0;
        }
      } else {
        // Clamp to valid range if not looping
        targetIndex = Math.max(0, Math.min(index, slides.length - 1));
      }

      setCurrentSlide(targetIndex);
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        prevTranslate.current = -targetIndex * containerWidth;
        currentTranslate.current = -targetIndex * containerWidth;
      }
    },
    [slides.length, loop]
  );

  // Auto-play functionality with stopOnInteraction (disabled on mobile)
  useEffect(() => {
    if (!autoplay || slides.length <= 1 || stopOnInteraction.current || isMobile) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = loop ? (prev + 1) % slides.length : Math.min(prev + 1, slides.length - 1);
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          prevTranslate.current = -nextSlide * containerWidth;
          currentTranslate.current = -nextSlide * containerWidth;
        }
        return nextSlide;
      });
    }, autoplayDelay);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoplay, autoplayDelay, slides.length, loop, isMobile]);

  const handleMouseEnter = () => {
    // Pause autoplay on hover (only on desktop)
    if (isMobile) return;

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Resume autoplay on mouse leave if not stopped by interaction (only on desktop)
    if (isMobile) return;

    if (!stopOnInteraction.current && autoplay && slides.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = loop
            ? (prev + 1) % slides.length
            : Math.min(prev + 1, slides.length - 1);
          if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            prevTranslate.current = -nextSlide * containerWidth;
            currentTranslate.current = -nextSlide * containerWidth;
          }
          return nextSlide;
        });
      }, autoplayDelay);
    }
  };

  const handleDragStart = useCallback(
    (clientX: number) => {
      isMouseDown.current = true;
      startX.current = clientX;
      hasMoved.current = false;
      if (containerRef.current) {
        currentTranslate.current = -currentSlide * containerRef.current.offsetWidth;
        prevTranslate.current = currentTranslate.current;
      }
    },
    [currentSlide]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isMouseDown.current || !containerRef.current) return;

      const diff = clientX - startX.current;

      // Start dragging only if moved more than 5px (prevents accidental drags on click)
      if (!hasMoved.current && Math.abs(diff) > 5) {
        hasMoved.current = true;
        setIsDragging(true);
        stopOnInteraction.current = true; // Stop autoplay on actual drag
      }

      if (!hasMoved.current) return; // Don't move until threshold is reached

      const containerWidth = containerRef.current.offsetWidth;
      const currentSlideOffset = -currentSlide * containerWidth;
      const newPosition = currentSlideOffset + diff;

      currentTranslate.current = newPosition;
      setTranslatePosition(newPosition);
    },
    [currentSlide]
  );

  const handleDragEnd = useCallback(() => {
    isMouseDown.current = false;

    if (!hasMoved.current) {
      // Was just a click, not a drag - do nothing
      hasMoved.current = false;
      return;
    }

    if (!containerRef.current) return;

    setIsDragging(false);
    hasMoved.current = false;

    const containerWidth = containerRef.current.offsetWidth;
    const movedBy = currentTranslate.current - -currentSlide * containerWidth;

    // Threshold for slide change (50px)
    if (movedBy < -50) {
      // Swipe left - next slide
      goToSlide(currentSlide + 1);
    } else if (movedBy > 50) {
      // Swipe right - previous slide
      goToSlide(currentSlide - 1);
    } else {
      // Snap back to current slide
      goToSlide(currentSlide);
    }
  }, [currentSlide, goToSlide]);

  // Touch events
  const handleTouchStart = (e: TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={styles.slider} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={containerRef}
        className={styles.slider__container}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          // Only trigger drag end if actually dragging
          if (isDragging) {
            handleDragEnd();
          }
        }}
      >
        <div
          className={styles.slider__track}
          style={{
            transform: isDragging
              ? `translateX(${translatePosition}px)`
              : `translateX(-${currentSlide * 100}%)`,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slider__slide}>
              <FeaturedBanner {...slide} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className={styles.slider__dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.slider__dot} ${
                index === currentSlide ? styles["slider__dot--active"] : ""
              }`}
              onClick={() => {
                stopOnInteraction.current = true; // Stop autoplay on manual navigation
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
