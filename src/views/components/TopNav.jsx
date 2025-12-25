import { NavLink } from "react-router-dom";
import { BagIcon, CalendarIcon, HomeIcon } from "./Icons.jsx";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-xl px-3 py-2 text-base font-semibold transition-all hover:-translate-y-0.5",
          isActive
            ? "bg-[color:rgba(150,194,219,0.45)] text-[color:var(--ui-text)]"
            : "text-[color:var(--ui-text-muted)] hover:bg-[color:rgba(150,194,219,0.25)] hover:text-[color:var(--ui-text)]",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--ui-border)] bg-[color:rgba(229,237,241,0.85)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/lunch.png"
            alt="Recipe Planner"
            className="h-9 w-9 rounded-xl bg-white p-1 ring-1 ring-[color:var(--ui-border)]"
            loading="eager"
          />
          <div>
            <div className="text-base font-semibold text-[color:var(--ui-text)]">
              Recipe Planner
            </div>
            <div className="text-sm text-[color:var(--ui-text-muted)]">
              Search, plan, shop
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto">
          <NavItem to="/">
            <span className="inline-flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Home
            </span>
          </NavItem>
          <NavItem to="/planner">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Meal Plan
            </span>
          </NavItem>
          <NavItem to="/shopping">
            <span className="inline-flex items-center gap-2">
              <BagIcon className="h-4 w-4" />
              Shopping List
            </span>
          </NavItem>
        </nav>
      </div>
    </header>
  );
}
