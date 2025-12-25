import {
  createEmptyMealPlan,
  withUpdatedAt,
  WEEK_DAYS,
} from "../models/mealPlanModel.js";
import { readJson, writeJson } from "../services/storageService.js";

const STORAGE_KEY = "slb_meal_plan_v1";

export function getWeekDays() {
  return WEEK_DAYS;
}

export function loadMealPlan() {
  const fallback = createEmptyMealPlan();
  const stored = readJson(STORAGE_KEY, fallback);

  if (!stored || typeof stored !== "object" || !stored.days) {
    return fallback;
  }

  const normalized = createEmptyMealPlan();
  for (const d of WEEK_DAYS) {
    normalized.days[d] = Array.isArray(stored.days?.[d]) ? stored.days[d] : [];
  }

  normalized.updatedAt = stored.updatedAt || normalized.updatedAt;
  return normalized;
}

export function saveMealPlan(plan) {
  writeJson(STORAGE_KEY, withUpdatedAt(plan));
}

export function addMealToDay(plan, day, recipeSummary) {
  if (!WEEK_DAYS.includes(day)) return plan;

  const next = {
    ...plan,
    days: {
      ...plan.days,
      [day]: [...(plan.days?.[day] ?? []), recipeSummary],
    },
  };

  return withUpdatedAt(next);
}

export function removeMealFromDay(plan, day, index) {
  if (!WEEK_DAYS.includes(day)) return plan;

  const meals = Array.isArray(plan.days?.[day]) ? plan.days[day] : [];
  const nextMeals = meals.filter((_, i) => i !== index);

  return withUpdatedAt({
    ...plan,
    days: {
      ...plan.days,
      [day]: nextMeals,
    },
  });
}

export function clearDay(plan, day) {
  if (!WEEK_DAYS.includes(day)) return plan;

  return withUpdatedAt({
    ...plan,
    days: {
      ...plan.days,
      [day]: [],
    },
  });
}

export function clearAll(plan) {
  return createEmptyMealPlan();
}
