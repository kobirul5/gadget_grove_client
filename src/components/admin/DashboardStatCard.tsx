import type { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
};

export default function DashboardStatCard({
  label,
  value,
  hint,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-primary/5 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="mt-2 truncate text-2xl font-bold tracking-tight text-text-primary">
            {value}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p className="mt-3 text-xs text-text-secondary">{hint}</p>
    </article>
  );
}
