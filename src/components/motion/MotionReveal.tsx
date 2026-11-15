"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function MotionReveal({ children, className = "", delay = 0, direction = "up" }: MotionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const distance = direction === "up" ? 28 : 42;
    const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
    const y = direction === "up" ? distance : 0;
    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, x, y, clipPath: "inset(0 0 12% 0)" },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
