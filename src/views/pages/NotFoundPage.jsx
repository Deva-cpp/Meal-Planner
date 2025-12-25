import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-6">
      <div className="text-sm font-semibold text-[color:var(--ui-text)]">
        Page not found
      </div>
      <div className="mt-1 text-sm text-[color:var(--ui-text-muted)]">
        The page you’re looking for doesn’t exist.
      </div>
      <Link
        to="/"
        className="mt-4 inline-flex rounded-xl bg-[color:var(--ui-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--ui-text)] hover:opacity-95"
      >
        Go to Search
      </Link>
    </div>
  );
}
