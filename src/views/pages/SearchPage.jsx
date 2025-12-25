import { useEffect, useMemo, useState } from "react";
import { searchRecipes } from "../../controllers/recipeController.js";
import { RecipeCard } from "../components/RecipeCard.jsx";
import { SearchIcon, SparklesIcon } from "../components/Icons.jsx";
import { RecipeCardSkeleton } from "../components/Skeletons.jsx";
import {
  EmptyBlock,
  ErrorBlock,
  LoadingBlock,
} from "../components/StateBlocks.jsx";
import { useDebouncedValue } from "../components/useDebouncedValue.js";

export function SearchPage() {
  const DEFAULT_QUERY = "chicken";
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [area, setArea] = useState("All");

  const trimmed = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (area !== "All" && r.area !== area) return false;
      return true;
    });
  }, [recipes, category, area]);

  const categories = useMemo(() => {
    const set = new Set();
    for (const r of recipes) if (r.category) set.add(r.category);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [recipes]);

  const areas = useMemo(() => {
    const set = new Set();
    for (const r of recipes) if (r.area) set.add(r.area);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [recipes]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setError("");

      const effectiveQuery = trimmed || DEFAULT_QUERY;

      setLoading(true);
      try {
        const data = await searchRecipes(effectiveQuery);
        if (!cancelled) setRecipes(data);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to search recipes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [trimmed]);

  return (
    <div className="ui-page space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)]">
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_0%,rgba(150,194,219,0.50),transparent_60%),radial-gradient(700px_circle_at_90%_10%,rgba(150,194,219,0.22),transparent_55%)]" />
        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-white/70 px-3 py-1 text-xs text-[color:var(--ui-text-muted)]">
                <SparklesIcon className="h-4 w-4 text-[color:var(--ui-primary)]" />
                Discover meals in seconds
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--ui-text)] sm:text-4xl">
                Find recipes you’ll actually cook
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-[color:var(--ui-text-muted)]">
                Type a keyword and instantly browse beautiful recipe cards. Add
                any meal to your weekly plan, then generate your shopping list.
              </p>
            </div>
            <img
              src="/images/lunch.png"
              alt=""
              className="hidden h-20 w-20 opacity-90 sm:block"
            />
          </div>

          <div className="mt-6">
            <div className="sticky top-[72px] z-10 rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.80)] p-3 backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--ui-text-muted)]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search meals… (e.g. chicken, pasta, curry)"
                    className="w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 py-3 pl-10 pr-4 text-base text-[color:var(--ui-text)] outline-none placeholder:text-[color:var(--ui-text-muted)] focus:border-[color:var(--ui-primary)] focus:ring-4 focus:ring-[color:rgba(150,194,219,0.25)]"
                  />
                  {query && trimmed !== query.trim() ? (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[color:var(--ui-text-muted)]">
                      searching…
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-2 md:w-[360px]">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 px-3 text-base text-[color:var(--ui-text)] outline-none focus:border-[color:var(--ui-primary)]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 px-3 text-sm text-[color:var(--ui-text)] outline-none focus:border-[color:var(--ui-primary)]"
                  >
                    {areas.map((a) => (
                      <option key={a} value={a} className="bg-white">
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="space-y-4">
          <LoadingBlock
            title={trimmed ? "Searching recipes" : "Loading recipes"}
            subtitle={trimmed || DEFAULT_QUERY}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="ui-fade-up"
                style={{ "--ui-delay": `${i * 40}ms` }}
              >
                <RecipeCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {error ? <ErrorBlock message={error} /> : null}

      {!loading && !error && !trimmed && recipes.length === 0 ? (
        <div className="rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-8">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70 ring-1 ring-[color:var(--ui-border)]">
              <SparklesIcon className="h-7 w-7 text-[color:var(--ui-primary)]" />
            </div>
            <div className="mt-4 text-xl font-semibold text-[color:var(--ui-text)]">
              Start typing to discover delicious recipes
            </div>
          </div>
        </div>
      ) : null}

      {!loading && !error && trimmed && filteredRecipes.length === 0 ? (
        <EmptyBlock
          title="No results found"
          subtitle="Try a different keyword, or reset filters to All."
        />
      ) : null}

      {!error && filteredRecipes.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-[color:var(--ui-text)]">
                {trimmed ? "Results" : "Popular picks"}
              </h2>
              <div className="mt-1 text-xs text-[color:var(--ui-text-muted)]">
                {filteredRecipes.length} meals
                {category !== "All" ? ` • ${category}` : ""}
                {area !== "All" ? ` • ${area}` : ""}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((r, idx) => (
              <div
                key={r.id}
                className="ui-fade-up"
                style={{ "--ui-delay": `${Math.min(idx, 12) * 35}ms` }}
              >
                <RecipeCard recipe={r} to={`/recipe/${r.id}`} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
