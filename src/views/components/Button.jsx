import { useRef, useState } from "react";

export function Button({
  children,
  className = "",
  variant = "solid",
  onClick,
  type = "button",
  disabled,
}) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  function handlePointerDown(e) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.25;

    const id = crypto.randomUUID();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 520);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "ghost"
      ? "border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] text-[color:var(--ui-text)] hover:bg-[color:rgba(255,255,255,0.95)]"
      : "bg-[color:var(--ui-primary)] text-[color:var(--ui-text)] hover:opacity-95";

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={[base, styles, className].join(" ")}
    >
      {children}
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ui-ripple"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
            }}
          />
        ))}
      </span>
    </button>
  );
}
