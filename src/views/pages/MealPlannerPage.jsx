import { getWeekDays } from "../../controllers/mealPlanController.js";

export function MealPlannerPage({
  mealPlan,
  onRemoveMeal,
  onClearDay,
  onClearAll,
}) {
  const days = getWeekDays();
  const totalMeals = days.reduce(
    (sum, d) => sum + (mealPlan.days?.[d]?.length ?? 0),
    0
  );

  return (
    <div className="ui-page space-y-6">
      <section className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--ui-text)]">
              Weekly Meal Planner
            </h1>
            <p className="mt-2 text-sm leading-6 text-[color:var(--ui-text-muted)]">
              Plan Monday–Sunday. Add multiple meals per day, then generate a
              shopping list.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="rounded-xl border border-[color:var(--ui-border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[color:var(--ui-text)] hover:bg-white"
          >
            Clear All
          </button>
        </div>

        <div className="mt-4 text-sm text-[color:var(--ui-text-muted)]">
          Planned meals: {totalMeals}
        </div>
      </section>

      {totalMeals === 0 ? (
        <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-8">
          <div className="mx-auto max-w-xl text-center">
            <div className="text-lg font-semibold text-[color:var(--ui-text)]">
              No meals planned yet — start by adding your favorite recipes
            </div>
            <div className="mt-2 text-sm text-[color:var(--ui-text-muted)]">
              Tip: open any recipe and tap “Add to Meal Plan”.
            </div>
          </div>
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => {
          const meals = mealPlan.days?.[day] ?? [];

          return (
            <div
              key={day}
              className="group rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-4 transition-colors hover:border-[color:rgba(150,194,219,0.85)]"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[color:var(--ui-text)]">
                  {day}
                </div>
                <button
                  type="button"
                  onClick={() => onClearDay(day)}
                  className="text-xs font-medium text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]"
                >
                  Clear day
                </button>
              </div>

              {meals.length === 0 ? (
                <div className="mt-3 rounded-2xl border border-dashed border-[color:var(--ui-border)] bg-white/60 p-4 text-sm text-[color:var(--ui-text-muted)]">
                  No meals yet. Add one from a recipe detail page.
                </div>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {meals.map((m, idx) => (
                    <li
                      key={`${m.id}-${idx}`}
                      className="ui-scale-in flex max-w-full items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-white/70 px-3 py-2"
                    >
                      {m.image ? (
                        <img
                          src={m.image}
                          alt=""
                          className="h-6 w-6 rounded-full object-cover ring-1 ring-[color:var(--ui-border)]"
                          loading="lazy"
                        />
                      ) : null}
                      <div
                        className="min-w-0 text-sm font-semibold text-[color:var(--ui-text)]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {m.title}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveMeal(day, idx)}
                        className="ml-1 rounded-full border border-[color:var(--ui-border)] bg-white/70 px-2 py-1 text-xs font-semibold text-[color:var(--ui-text-muted)] hover:bg-white hover:text-[color:var(--ui-text)]"
                        aria-label="Remove meal"
                        title="Remove"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
