type RevenueMonth = {
  label: string;
  amount: number;
};

export default function RevenueChart({
  months,
  total,
}: {
  months: RevenueMonth[];
  total: number;
}) {
  const chartWidth = 720;
  const chartHeight = 250;
  const chartTop = 16;
  const chartBottom = 194;
  const maximum = Math.max(...months.map(({ amount }) => amount), 1);
  const step = chartWidth / Math.max(months.length, 1);
  const barWidth = Math.min(34, step * 0.48);
  const gridValues = [1, 0.66, 0.33, 0];

  return (
    <section
      aria-labelledby="revenue-chart-title"
      className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-primary/5 sm:p-6"
    >
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            className="font-semibold text-text-primary"
            id="revenue-chart-title"
          >
            Revenue
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Monthly totals around the latest saved order
          </p>
        </div>
        <p className="text-sm font-semibold text-text-primary">
          {total.toLocaleString("en-BD")} ৳
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          aria-label={`Revenue by month around the latest saved order. Total ${total.toLocaleString("en-BD")} taka.`}
          className="h-56 min-w-[560px] w-full"
          role="img"
          viewBox={`-50 0 ${chartWidth + 50} ${chartHeight}`}
        >
          {gridValues.map((fraction) => {
            const y =
              chartTop + (chartBottom - chartTop) * (1 - fraction);
            const value = Math.round(maximum * fraction);

            return (
              <g key={fraction}>
                <text
                  className="fill-text-secondary text-[10px]"
                  textAnchor="end"
                  x="-8"
                  y={y + 3}
                >
                  {value.toLocaleString("en-BD")}
                </text>
                <line
                  className="stroke-border"
                  strokeDasharray={fraction === 0 ? undefined : "3 5"}
                  x1="0"
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                />
              </g>
            );
          })}
          {months.map(({ label, amount }, index) => {
            const barHeight =
              (amount / maximum) * (chartBottom - chartTop);
            const x = step * index + (step - barWidth) / 2;
            const y = chartBottom - barHeight;

            return (
              <g key={`${label}-${index}`}>
                {amount > 0 ? (
                  <rect
                    className="fill-primary/80"
                    height={Math.max(barHeight, 2)}
                    rx="5"
                    width={barWidth}
                    x={x}
                    y={y}
                  >
                    <title>
                      {label}: {amount.toLocaleString("en-BD")} taka
                    </title>
                  </rect>
                ) : null}
                <text
                  className="fill-text-secondary text-[10px]"
                  textAnchor="middle"
                  x={step * index + step / 2}
                  y="220"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {months.length === 0 ? (
        <p className="text-center text-xs text-text-secondary">
          Revenue will appear here after orders are placed in this browser.
        </p>
      ) : null}
    </section>
  );
}
