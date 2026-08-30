import { useEffect } from "react";

const selector = "[data-reveal]";

export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.dataset.revealVisible = "true";
      });
      return;
    }

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.revealVisible = "true";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    const revealVisibleElements = () => {
      document
        .querySelectorAll<HTMLElement>(`${selector}:not([data-reveal-visible])`)
        .forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.94 && rect.bottom >= 0;

          if (!isVisible) return;

          element.dataset.revealVisible = "true";
          observer.unobserve(element);
        });
    };

    let frame = 0;
    const scheduleVisibilityCheck = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(revealVisibleElements);
    };

    const observe = (scope: ParentNode = document) => {
      scope
        .querySelectorAll<HTMLElement>(`${selector}:not([data-reveal-ready])`)
        .forEach((element) => {
          element.dataset.revealReady = "true";
          observer.observe(element);
        });
    };

    observe();
    scheduleVisibilityCheck();
    window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
    window.addEventListener("resize", scheduleVisibilityCheck);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector) && !node.dataset.revealReady) {
            node.dataset.revealReady = "true";
            observer.observe(node);
          }
          observe(node);
          scheduleVisibilityCheck();
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleVisibilityCheck);
      window.removeEventListener("resize", scheduleVisibilityCheck);
      observer.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
