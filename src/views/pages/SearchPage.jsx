import { useEffect, useMemo, useState } from "react";
import { searchRecipes } from "../../controllers/recipeController.js";
import { RecipeCard } from "../components/RecipeCard.jsx";
import { Button } from "../components/Button.jsx";
import { SearchIcon, SparklesIcon } from "../components/Icons.jsx";
import { RecipeCardSkeleton } from "../components/Skeletons.jsx";
import {
  EmptyBlock,
  ErrorBlock,
  LoadingBlock,
} from "../components/StateBlocks.jsx";
import { useDebouncedValue } from "../components/useDebouncedValue.js";

export function SearchPage() {
  const ITEMS_PER_PAGE = 9;
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
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

      const effectiveQuery = trimmed;

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
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-white/70 px-2.5 py-1 text-xs text-[color:var(--ui-text-muted)] sm:px-3">
                <SparklesIcon className="h-3.5 w-3.5 text-[color:var(--ui-primary)] sm:h-4 sm:w-4" />
                Discover meals in seconds
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--ui-text)] sm:mt-4 sm:text-3xl md:text-4xl">
                Find recipes you'll actually cook
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--ui-text-muted)] sm:text-base sm:leading-7">
                Type a keyword and instantly browse beautiful recipe cards. Add
                any meal to your weekly plan, then generate your shopping list.
              </p>
            </div>
            <img
              src="/images/lunch.png"
              alt=""
              className="hidden h-16 w-16 opacity-90 sm:block sm:h-20 sm:w-20"
            />
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="sticky top-[72px] z-10 rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.80)] p-2.5 backdrop-blur sm:p-3">
              <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--ui-text-muted)] sm:left-3 sm:h-5 sm:w-5" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search meals… (e.g. chicken, pasta, curry)"
                    className="w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 py-2.5 pl-9 pr-3 text-sm text-[color:var(--ui-text)] outline-none placeholder:text-[color:var(--ui-text-muted)] focus:border-[color:var(--ui-primary)] focus:ring-4 focus:ring-[color:rgba(150,194,219,0.25)] sm:py-3 sm:pl-10 sm:pr-4 sm:text-base"
                  />
                  {query && trimmed !== query.trim() ? (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[color:var(--ui-text-muted)]">
                      searching…
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:w-auto md:w-[360px]">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 px-2.5 text-sm text-[color:var(--ui-text)] outline-none focus:border-[color:var(--ui-primary)] sm:h-11 sm:px-3 sm:text-base"
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
                    className="h-10 w-full rounded-xl border border-[color:var(--ui-border)] bg-white/80 px-2.5 text-sm text-[color:var(--ui-text)] outline-none focus:border-[color:var(--ui-primary)] sm:h-11 sm:px-3"
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
            subtitle={trimmed || "Popular picks"}
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



      {!loading && !error && trimmed && filteredRecipes.length === 0 ? (
        <EmptyBlock
          title="No results found"
          subtitle="Try a different keyword, or reset filters to All."
        />
      ) : null}

      {!error && filteredRecipes.length > 0 ? (
        <section className="space-y-4">
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
            {paginatedRecipes.map((r, idx) => (
              <div
                key={r.id}
                className="ui-fade-up"
                style={{ "--ui-delay": `${Math.min(idx, 12) * 35}ms` }}
              >
                <RecipeCard recipe={r} to={`/recipe/${r.id}`} />
              </div>
            ))}
          </div>
          {totalPages > 1 ? (
            <div className="flex flex-col items-center justify-center gap-2 pt-2 sm:flex-row sm:gap-3">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              <div className="text-sm text-[color:var(--ui-text-muted)]">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
