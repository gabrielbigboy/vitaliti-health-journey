import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Transição suave entre páginas:
 * - "saída": leve esmaecimento enquanto a próxima rota carrega
 * - "entrada": fade + subida sutil do novo conteúdo
 * Tudo é desativado quando o sistema pede "reduzir movimento".
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPending = useRouterState({ select: (s) => s.status === "pending" });
  const [reduced, setReduced] = useState(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Volta ao topo a cada troca de rota (sem "pulo" quando há âncora).
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [pathname, reduced]);

  return (
    <div
      className={[
        "page-transition",
        isPending && !reduced ? "is-leaving" : "",
        reduced ? "motion-off" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div key={reduced ? "static" : pathname} className="page-transition-inner">
        {children}
      </div>
    </div>
  );
}
