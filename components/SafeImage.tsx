// components/SafeImage.tsx
"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// import placeHolder from "@/public/assets/logos/panda_question.svg";
// public/ 아래 파일은 import 대신 경로 문자열로 접근하는 게 가장 단순합니다.
const DEFAULT_FALLBACK = "/assets/logos/panda_question.svg";

type SafeImageProps = Omit<
  ImageProps,
  "src" | "alt" | "width" | "height" | "onError" | "onLoad"
> & {
  src: string; // 문자열 경로(권장: /assets/... 또는 외부 URL)
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string; // 기본값: DEFAULT_FALLBACK
  showSpinner?: boolean; // 로딩 중에 스피너 표시 여부
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
};




export default function SafeImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = DEFAULT_FALLBACK,
  showSpinner = true,
  containerStyle,
  containerClassName,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          console.log("엑박이라 placeholder로 대체");
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
        priority
        {...props}
      />
      {showSpinner && isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
