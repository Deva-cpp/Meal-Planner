import { useMemo, useState } from "react";
import {
  generateShoppingListFromMealPlan,
  togglePurchased,
} from "../../controllers/shoppingListController.js";
import { BagIcon } from "../components/Icons.jsx";
import { Button } from "../components/Button.jsx";

export function ShoppingListPage({
  mealPlan,
  shoppingItems,
  onSetShoppingItems,
  onClearShopping,
}) {
  const [confirmClear, setConfirmClear] = useState(false);
  const plannedMealsCount = useMemo(() => {
    let n = 0;
    for (const meals of Object.values(mealPlan.days ?? {})) n += meals.length;
    return n;
  }, [mealPlan]);

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      window.setTimeout(() => setConfirmClear(false), 1800);
      return;
    }
    onClearShopping();
    setConfirmClear(false);
  }

  return (
    <div className="ui-page space-y-6">
      <section className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 ring-1 ring-[color:var(--ui-border)]">
              <BagIcon className="h-6 w-6 text-[color:var(--ui-primary)]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--ui-text)]">
                Shopping List
              </h1>
              <p className="mt-2 text-sm leading-6 text-[color:var(--ui-text-muted)]">
                Consolidated ingredients from your planned meals.
              </p>
              <div className="mt-2 text-sm text-[color:var(--ui-text-muted)]">
                Planned meals: {plannedMealsCount}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() =>
                onSetShoppingItems(
                  generateShoppingListFromMealPlan(mealPlan, shoppingItems)
                )
              }
            >
              Generate from Plan
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              {confirmClear ? "Confirm clear" : "Clear"}
            </Button>
          </div>
        </div>
      </section>

      {shoppingItems.length === 0 ? (
        <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-8 text-center">
          <div className="text-lg font-semibold text-[color:var(--ui-text)]">
            Your shopping list is empty
          </div>
          <div className="mt-2 text-sm text-[color:var(--ui-text-muted)]">
            Plan meals to generate one.
          </div>
        </div>
      ) : (
        <section className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-4 sm:p-5">
          <ul className="space-y-2">
            {shoppingItems.map((it, idx) => (
              <li
                key={it.key}
                className="ui-fade-up"
                style={{ "--ui-delay": `${Math.min(idx, 18) * 28}ms` }}
              >
                <label
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-2xl border border-[color:var(--ui-border)] bg-white/70 px-3 py-3 transition-colors hover:bg-white",
                    it.purchased ? "opacity-70" : "opacity-100",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={it.purchased}
                    onChange={() =>
                      onSetShoppingItems(togglePurchased(shoppingItems, it.key))
                    }
                    className="mt-1 h-4 w-4 accent-[color:var(--ui-primary)]"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className={
                        it.purchased
                          ? "text-sm font-semibold text-[color:var(--ui-text-muted)] line-through"
                          : "text-sm font-semibold text-[color:var(--ui-text)]"
                      }
                    >
                      {it.name}
                    </div>
                    {it.measures?.length ? (
                      <div className="mt-1 text-xs text-[color:var(--ui-text-muted)]">
                        {it.measures.join(" + ")}
                      </div>
                    ) : null}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
