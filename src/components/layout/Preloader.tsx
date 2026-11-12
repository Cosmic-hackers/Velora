"use client";

import { useEffect, useState } from "react";

const WORDMARK = "VELORA";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let animationFrame = 0;
    let isReady = false;
    const startedAt = performance.now();

    const finishLoading = () => {
      if (isReady) return;
      isReady = true;
      setProgress(100);
      setIsExiting(true);
      window.setTimeout(() => setIsVisible(false), 700);
    };

    const handleLoad = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(finishLoading);
      } else {
        finishLoading();
      }
    };

    const animateProgress = (now: number) => {
      if (!isReady) {
        const elapsed = now - startedAt;
        setProgress(Math.min(88, Math.round((elapsed / 1400) * 88)));
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    window.addEventListener("load", handleLoad, { once: true });
    animationFrame = window.requestAnimationFrame(animateProgress);

    if (document.readyState === "complete") {
      handleLoad();
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`velora-preloader ${isExiting ? "velora-preloader--exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="velora-preloader__light" />
      <div className="velora-preloader__content">
        <div className="velora-preloader__wordmark" aria-label="VELORA">
          {WORDMARK.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="velora-preloader__letter"
              style={{ animationDelay: `${index * 85}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="velora-preloader__meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <span className="velora-preloader__percentage">{progress}%</span>
      </div>
    </div>
  );
}
