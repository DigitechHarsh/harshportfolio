"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // If it's a touch device, do not run custom cursor tracking
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Dynamic hover listeners for links, buttons, and inputs
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .cursor-pointer"
      );
      interactives.forEach((el) => {
        // Avoid duplicate listeners
        if (el.getAttribute("data-cursor-tracked") === "true") return;
        el.setAttribute("data-cursor-tracked", "true");

        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    addHoverListeners();

    // Use MutationObserver to watch for new interactive items appearing in DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let animationFrameId: number;

    const tick = () => {
      // Lerp (Linear Interpolation) factors for smooth tracking
      const easeDot = 0.3;
      const easeRing = 0.12;

      dotPos.x += (mouse.x - dotPos.x) * easeDot;
      dotPos.y += (mouse.y - dotPos.y) * easeDot;

      ringPos.x += (mouse.x - ringPos.x) * easeRing;
      ringPos.y += (mouse.y - ringPos.y) * easeRing;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${dotPos.x}px - 50%), calc(${dotPos.y}px - 50%), 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringPos.x}px - 50%), calc(${ringPos.y}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [hidden]);

  return (
    <>
      {/* Center dot pointer */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] transition-all duration-300 pointer-fine:block hidden ${
          hidden ? "opacity-0 scale-0" : "opacity-100 scale-100"
        } ${linkHovered ? "bg-violet-400 scale-150 shadow-[0_0_10px_rgba(139,92,246,0.6)]" : ""} ${
          clicked ? "scale-75 bg-fuchsia-400" : ""
        }`}
        style={{ willChange: "transform" }}
      />
      
      {/* Lag-behind outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan-500/35 pointer-events-none z-[9998] transition-all duration-300 pointer-fine:block hidden ${
          hidden ? "opacity-0 scale-0" : "opacity-100 scale-100"
        } ${
          linkHovered
            ? "border-violet-500/70 bg-violet-500/10 w-16 h-16 shadow-[0_0_20px_rgba(139,92,246,0.4),_inset_0_0_8px_rgba(139,92,246,0.2)]"
            : "bg-cyan-500/[0.03]"
        } ${
          clicked ? "scale-90 border-fuchsia-500/80 bg-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.5)]" : ""
        }`}
        style={{
          willChange: "transform",
          transformOrigin: "center center",
        }}
      />
    </>
  );
}
