"use client";

import { useEffect } from "react";

/** One scroll listener; only visible image frames are measured and updated. */
export default function Parallax() {
  useEffect(() => {
    const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const visible = new Set<HTMLElement>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const render = () => {
      frameId = 0;
      const viewport = window.innerHeight;
      const mobile = window.innerWidth <= 700;
      const speed = mobile ? 0.18 : 0.32;
      // Read all geometry before writing styles to avoid layout thrashing.
      const updates = Array.from(visible, (element) => {
        const bounds = element.getBoundingClientRect();
        const distanceFromCenter = viewport / 2 - bounds.top - bounds.height / 2;
        // Keep travel inside the image's 25% overscan so no empty edge appears.
        const maxTravel = bounds.height * 0.24;
        const offset = Math.max(-maxTravel, Math.min(maxTravel, distanceFromCenter * speed));
        return { element, offset };
      });
      for (const { element, offset } of updates) {
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      }
    };
    const schedule = () => {
      if (!reducedMotion.matches && !frameId) frameId = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(element);
        else visible.delete(element);
      }
      schedule();
    });
    const configure = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      observer.disconnect();
      visible.clear();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const element of frames) element.style.removeProperty("--parallax-y");
      if (reducedMotion.matches) return;
      frames.forEach((element) => observer.observe(element));
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };
    configure();
    reducedMotion.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", configure);
      frames.forEach((element) => element.style.removeProperty("--parallax-y"));
    };
  }, []);
  return null;
}
