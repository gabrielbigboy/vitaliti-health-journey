import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/vitaliti-logo.jpg.asset.json";

export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center overflow-hidden rounded-xl bg-card ring-1 ring-border",
        className,
      )}
    >
      <img src={logoAsset.url} alt="Vitaliti Saúde" className="size-full object-cover" />
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
      <LogoMark />

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
