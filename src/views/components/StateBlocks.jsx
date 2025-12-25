import { Button } from "./Button.jsx";
import { AlertIcon, InfoIcon, RetryIcon } from "./Icons.jsx";

export function LoadingBlock({ title = "Loading…", subtitle }) {
  return (
    <div className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-6">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[color:rgba(150,194,219,0.45)] border-t-[color:var(--ui-primary)]" />
        <div>
          <div className="text-sm font-semibold text-[color:var(--ui-text)]">
            {title}
          </div>
          {subtitle ? (
            <div className="text-sm text-[color:var(--ui-text-muted)]">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ErrorBlock({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-red-100">
        <AlertIcon className="h-4 w-4" />
        {title}
      </div>
      {message ? (
        <div className="mt-1 text-sm text-red-200/80">{message}</div>
      ) : null}
      {onRetry ? (
        <div className="mt-4">
          <Button variant="ghost" onClick={onRetry}>
            <RetryIcon className="h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function EmptyBlock({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--ui-text)]">
        <InfoIcon className="h-4 w-4 text-[color:var(--ui-text-muted)]" />
        {title}
      </div>
      {subtitle ? (
        <div className="mt-1 text-sm text-[color:var(--ui-text-muted)]">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
