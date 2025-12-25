export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function createEmptyMealPlan() {
  const days = {};
  for (const d of WEEK_DAYS) {
    days[d] = [];
  }

  return {
    version: 1,
    days,
    updatedAt: new Date().toISOString(),
  };
}

export function withUpdatedAt(plan) {
  return {
    ...plan,
    updatedAt: new Date().toISOString(),
  };
}
