import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeDetail } from "../../controllers/recipeController.js";
import { getWeekDays } from "../../controllers/mealPlanController.js";
import { Button } from "../components/Button.jsx";
import {
  BackIcon,
  CheckIcon,
  ExternalLinkIcon,
  MapPinIcon,
  PlusIcon,
  TagIcon,
  YoutubeIcon,
} from "../components/Icons.jsx";
import { RecipeDetailSkeleton } from "../components/Skeletons.jsx";
import { EmptyBlock, ErrorBlock } from "../components/StateBlocks.jsx";

export function RecipeDetailPage({ onAddToMealPlan }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const [day, setDay] = useState(() => getWeekDays()[0]);

  const days = useMemo(() => getWeekDays(), []);

  const instructionSteps = useMemo(() => {
    const raw = detail?.instructions ?? "";
    const byLines = raw
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (byLines.length >= 2) return byLines;

    const bySentences = raw
      .split(/\.(?:\s+|$)/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (bySentences.length >= 3) return bySentences.map((s) => `${s}.`);

    return [];
  }, [detail?.instructions]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const data = await getRecipeDetail(id);
        if (!cancelled) setDetail(data);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load recipe");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  if (loading) return <RecipeDetailSkeleton />;
  if (error)
    return (
      <ErrorBlock message={error} onRetry={() => setReloadKey((v) => v + 1)} />
    );
  if (!detail) {
    return (
      <EmptyBlock
        title="Recipe not found"
        subtitle="Try going back and selecting another meal."
      />
    );
  }

  function handleAdd() {
    onAddToMealPlan(day, detail);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="ui-page-slide-in pb-40 md:pb-10">
      <div className="sticky top-20 mb-6 z-10 -mx-4 border-b border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.80)] px-3 py-2 shadow-sm backdrop-blur sm:px-4 sm:py-3">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-sm sm:text-base">
            <BackIcon className="h-4 w-4" />
            <span className="hidden xs:inline">Back</span>
          </Button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {justAdded ? (
              <div className="hidden text-sm font-semibold text-[color:var(--ui-primary)] sm:block">
                <span className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  Added to {day}
                </span>
              </div>
            ) : null}
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="h-9 rounded-xl border border-[color:var(--ui-border)] bg-white/80 px-2 text-xs text-[color:var(--ui-text)] outline-none focus:border-[color:var(--ui-primary)] sm:h-12 sm:px-3 sm:text-base"
            >
              {days.map((d) => (
                <option key={d} value={d} className="bg-white">
                  {d}
                </option>
              ))}
            </select>
            <Button onClick={handleAdd} className="text-xs sm:text-sm">
              <PlusIcon className="h-4 w-4" />
              <span className="hidden xs:inline">Add to Plan</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <img
            src={detail.image}
            alt={detail.title}
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {detail.title}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {detail.category ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white ring-1 ring-white/20 backdrop-blur">
                    {detail.category}
                  </span>
                ) : null}
                {detail.area ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white ring-1 ring-white/20 backdrop-blur">
                    {detail.area}
                  </span>
                ) : null}
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white ring-1 ring-white/20 backdrop-blur">
                  {detail.ingredients.length} ingredients
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[color:var(--ui-text)]">
              Overview
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {detail.category ? (
                <span className="rounded-full border border-[color:var(--ui-border)] bg-white/70 px-3 py-1 text-sm text-[color:var(--ui-text)]">
                  <span className="inline-flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-(--ui-text-muted)" />
                    Category: {detail.category}
                  </span>
                </span>
              ) : null}
              {detail.area ? (
                <span className="rounded-full border border-[color:var(--ui-border)] bg-white/70 px-3 py-1 text-sm text-[color:var(--ui-text)]">
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-(--ui-text-muted)" />
                    Cuisine: {detail.area}
                  </span>
                </span>
              ) : null}
              <span className="rounded-full border border-[color:var(--ui-border)] bg-white/70 px-3 py-1 text-sm text-[color:var(--ui-text)]">
                Ingredients: {detail.ingredients.length}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[color:var(--ui-text)]">
              Links
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              {detail.source ? (
                <a
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--ui-border)] bg-white/70 px-4 py-3 text-sm font-semibold text-[color:var(--ui-text)] transition-colors hover:bg-white"
                  href={detail.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLinkIcon className="h-4 w-4 text-(--ui-text-muted)" />
                    Open recipe source
                  </span>
                  <ExternalLinkIcon className="h-4 w-4 text-(--ui-text-muted)" />
                </a>
              ) : null}
              {detail.youtube ? (
                <a
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--ui-border)] bg-white/70 px-4 py-3 text-sm font-semibold text-[color:var(--ui-text)] transition-colors hover:bg-white"
                  href={detail.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <YoutubeIcon className="h-4 w-4 text-(--ui-text-muted)" />
                    Watch on YouTube
                  </span>
                  <ExternalLinkIcon className="h-4 w-4 text-(--ui-text-muted)" />
                </a>
              ) : null}
              {!detail.source && !detail.youtube ? (
                <div className="rounded-2xl border border-[color:var(--ui-border)] bg-white/50 px-4 py-3 text-sm text-[color:var(--ui-text-muted)]">
                  No links available for this recipe.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <aside className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5 sm:p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-[color:var(--ui-text)]">
                Ingredients
              </h2>
              <div className="text-sm text-[color:var(--ui-text-muted)]">
                {detail.ingredients.length} items
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {detail.ingredients.map((i, idx) => (
                <li
                  key={`${i.name}-${i.measure}`}
                  className="ui-fade-up"
                  style={{ "--ui-delay": `${Math.min(idx, 14) * 30}ms` }}
                >
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[color:var(--ui-border)] bg-white/60 px-3 py-3 transition-colors hover:bg-white">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[color:var(--ui-primary)]"
                    />
                    <div className="flex-1">
                      <div className="text-base font-semibold text-[color:var(--ui-text)]">
                        {i.name}
                      </div>
                      {i.measure ? (
                        <div className="mt-0.5 text-sm text-[color:var(--ui-text-muted)]">
                          {i.measure}
                        </div>
                      ) : null}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[color:var(--ui-text)]">
              Instructions
            </h2>
            {instructionSteps.length ? (
              <ol className="mt-4 space-y-3">
                {instructionSteps.map((step, idx) => (
                  <li
                    key={`${idx}-${step.slice(0, 18)}`}
                    className="flex gap-3"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:rgba(150,194,219,0.25)] text-sm font-semibold text-[color:var(--ui-text)]">
                      {idx + 1}
                    </div>
                    <div className="flex-1 whitespace-pre-line text-base leading-7 text-[color:var(--ui-text-muted)]">
                      {step}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-[color:var(--ui-text-muted)]">
                {detail.instructions}
              </p>
            )}
          </div>
        </section>
      </div>


    </div>
  );
}
