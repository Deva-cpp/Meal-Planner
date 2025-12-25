import { Link } from "react-router-dom";

export function RecipeCard({ recipe, to }) {
  return (
    <Link
      to={to}
      className="group overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.85)] shadow-[0_10px_30px_-18px_var(--ui-shadow)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_42px_-24px_var(--ui-shadow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <div
          className="text-base font-semibold leading-snug text-[color:var(--ui-text)]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {recipe.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.category ? (
            <span className="rounded-full border border-[color:rgba(150,194,219,0.40)] bg-[color:rgba(150,194,219,0.18)] px-2.5 py-1 text-xs font-semibold text-[color:var(--ui-text)]">
              {recipe.category}
            </span>
          ) : null}
          {recipe.area ? (
            <span className="rounded-full border border-[color:rgba(150,194,219,0.40)] bg-[color:rgba(150,194,219,0.18)] px-2.5 py-1 text-xs font-semibold text-[color:var(--ui-text)]">
              {recipe.area}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
