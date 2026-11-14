import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  href?: string;
  titleId?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  href,
  titleId,
}: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div>
        <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2
          className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl"
          id={titleId}
        >
          {title}
        </h2>
      </div>
      {href && (
        <Link
          className="hidden items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-primary sm:inline-flex"
          href={href}
        >
          View all
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
