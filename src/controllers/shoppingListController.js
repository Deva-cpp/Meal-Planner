import {
  createShoppingItem,
  normalizeIngredientKey,
} from "../models/shoppingListModel.js";
import { readJson, writeJson } from "../services/storageService.js";

const STORAGE_KEY = "slb_shopping_list_v1";

export function loadShoppingList() {
  const stored = readJson(STORAGE_KEY, []);
  return Array.isArray(stored) ? stored : [];
}

export function saveShoppingList(items) {
  writeJson(STORAGE_KEY, items);
}

export function togglePurchased(items, key) {
  return items.map((it) =>
    it.key === key ? { ...it, purchased: !it.purchased } : it
  );
}

export function clearShoppingList() {
  return [];
}

export function generateShoppingListFromMealPlan(mealPlan, existingItems = []) {
  const existingByKey = new Map(
    existingItems.map((it) => [it.key, Boolean(it.purchased)])
  );

  const map = new Map();

  for (const meals of Object.values(mealPlan?.days ?? {})) {
    for (const meal of meals) {
      if (!meal?.ingredients) continue;

      for (const ing of meal.ingredients) {
        const key = normalizeIngredientKey(ing.name);
        if (!key) continue;

        const current = map.get(key) ?? {
          key,
          name: ing.name,
          measures: new Set(),
        };

        if (ing.measure) current.measures.add(ing.measure);
        map.set(key, current);
      }
    }
  }

  const items = Array.from(map.values())
    .map((v) =>
      createShoppingItem({
        key: v.key,
        name: v.name,
        measures: Array.from(v.measures.values()),
        purchased: existingByKey.get(v.key) ?? false,
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
}
