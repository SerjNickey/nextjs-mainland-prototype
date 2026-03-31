import { useState, useRef, useEffect } from "react";
import type { StaticImageData } from "next/image";

interface LazyImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const LazyImage = ({
  src,
  alt,
  className,
  placeholder,
}: LazyImageProps) => {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? resolvedSrc : placeholder}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0.5 }}
    />
  );
};
