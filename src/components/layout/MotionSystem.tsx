"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MotionSystem() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magneticElements.map((element) => {
      const handleMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
        gsap.to(element, { x, y, duration: 0.4, ease: "power3.out", overwrite: true });
      };
      const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      element.addEventListener("mousemove", handleMove);
      element.addEventListener("mouseleave", reset);
      return () => {
        element.removeEventListener("mousemove", handleMove);
        element.removeEventListener("mouseleave", reset);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animations: gsap.core.Tween[] = [];
    const frame = window.requestAnimationFrame(() => {
      const sections = gsap.utils.toArray<HTMLElement>("main section:not([data-motion-skip])");
      animations = sections.map((section, index) => {
        const fromX = index % 2 === 0 ? -24 : 24;
        return gsap.fromTo(
          section,
          { autoAlpha: 0, x: fromX, clipPath: "inset(0 0 10% 0)" },
          {
            autoAlpha: 1,
            x: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [pathname]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const curtain = curtainRef.current;
    if (!curtain || !isNavigating) return;

    gsap.fromTo(
      curtain,
      { scaleY: 1, transformOrigin: "top center" },
      {
        scaleY: 0,
        duration: 0.75,
        ease: "power4.inOut",
        delay: 0.08,
        onComplete: () => setIsNavigating(false),
      }
    );
  }, [pathname, isNavigating]);

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement;
      const link = target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//") || href === pathname) return;

      event.preventDefault();
      if (isNavigating) return;
      setIsNavigating(true);

      gsap.to(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => router.push(href),
      });
    };

    document.addEventListener("click", handleNavigation, true);
    return () => document.removeEventListener("click", handleNavigation, true);
  }, [isNavigating, pathname, router]);

  return (
    <>
      <div ref={curtainRef} className="velora-page-curtain" aria-hidden="true">
        <span className="velora-page-curtain__logo">VELORA</span>
      </div>
    </>
  );
}
