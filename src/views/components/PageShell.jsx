import { TopNav } from "./TopNav.jsx";

export function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-20%,rgba(150,194,219,0.55),transparent_55%),radial-gradient(900px_circle_at_90%_0%,rgba(150,194,219,0.25),transparent_50%)]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-[color:var(--ui-border)] bg-[color:rgba(229,237,241,0.85)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="font-semibold text-[color:var(--ui-text)]">
            Recipe Planner
          </div>
          <div className="text-[color:var(--ui-text-muted)]">
            © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
