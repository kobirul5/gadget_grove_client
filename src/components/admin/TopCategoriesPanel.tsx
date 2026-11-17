export type CategorySummary = {
  name: string;
  itemCount: number;
  revenue: number;
};

export default function TopCategoriesPanel({
  categories,
}: {
  categories: CategorySummary[];
}) {
  const highestRevenue = Math.max(
    ...categories.map(({ revenue }) => revenue),
    1,
  );

  return (
    <section
      aria-labelledby="top-categories-title"
      className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-primary/5 sm:p-6"
      id="categories"
    >
      <div>
        <h2
          className="font-semibold text-text-primary"
          id="top-categories-title"
        >
          Top categories
        </h2>
        <p className="mt-1 text-xs text-text-secondary">
          Based on placed orders
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="mt-8 rounded-xl bg-surface-secondary px-4 py-6 text-center text-sm text-text-secondary">
          Category sales will appear here after an order is placed.
        </p>
      ) : (
        <ul className="mt-5 space-y-5">
          {categories.map(({ name, itemCount, revenue }) => (
            <li key={name}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium text-text-primary">
                  {name}
                </span>
                <span className="shrink-0 text-xs text-text-secondary">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>
              <div
                aria-label={`${name}: ${revenue.toLocaleString("en-BD")} taka`}
                className="mt-2 h-2 overflow-hidden rounded-full bg-surface-secondary"
                role="img"
              >
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.max((revenue / highestRevenue) * 100, 4)}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-right text-xs text-text-secondary">
                ৳ {revenue.toLocaleString("en-BD")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
