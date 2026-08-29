import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5.5 12 19l6-13.5" />
        <path d="M12 19c0-4.5 2.6-7.4 6-8" opacity="0.5" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Vitaliti Saúde — página inicial">
      <LogoMark className={inverted ? "bg-primary-foreground text-primary" : undefined} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.0625rem] font-bold tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground",
          )}
        >
          Vitaliti
        </span>
        <span
          className={cn(
            "text-[0.6875rem] font-medium tracking-[0.22em] uppercase",
            inverted ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          Saúde
        </span>
      </span>
    </Link>
  );
}
