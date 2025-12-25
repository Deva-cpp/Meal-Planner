export function createShoppingItem({ key, name, measures, purchased }) {
  return {
    key,
    name,
    measures,
    purchased: Boolean(purchased),
  };
}

export function normalizeIngredientKey(name) {
  return String(name || "")
    .trim()
    .toLowerCase();
}
