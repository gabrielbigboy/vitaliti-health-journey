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

    const observe = (scope: ParentNode = document) => {
      scope
        .querySelectorAll<HTMLElement>(`${selector}:not([data-reveal-ready])`)
        .forEach((element) => {
          element.dataset.revealReady = "true";
          observer.observe(element);
        });
    };

    observe();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector) && !node.dataset.revealReady) {
            node.dataset.revealReady = "true";
            observer.observe(node);
          }
          observe(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
