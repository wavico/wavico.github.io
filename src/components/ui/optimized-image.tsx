import { useState, useEffect } from "react";
import { optimizeImage, generateBlurDataURL } from "@/utils/imageOptimizer";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

  useEffect(() => {
    if (!priority) {
      generateBlurDataURL(src).then(setBlurDataURL);
    }
  }, [src, priority]);

  const optimizedSrc = optimizeImage(src, width);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
      {isLoading && blurDataURL && (
        <div
          className="absolute inset-0 blur-lg"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </div>
  );
};
