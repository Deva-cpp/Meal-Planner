export function normalizeMealSummary(meal) {
  if (!meal) return null;

  return {
    id: meal.idMeal,
    title: meal.strMeal ?? "",
    image: meal.strMealThumb ?? "",
    category: meal.strCategory ?? "",
    area: meal.strArea ?? "",
  };
}

export function normalizeMealDetail(meal) {
  if (!meal) return null;

  return {
    ...normalizeMealSummary(meal),
    instructions: meal.strInstructions ?? "",
    ingredients: extractIngredients(meal),
    source: meal.strSource ?? "",
    youtube: meal.strYoutube ?? "",
  };
}

export function extractIngredients(meal) {
  const items = [];

  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanMeasure = typeof measure === "string" ? measure.trim() : "";

    if (!cleanName) continue;

    items.push({
      name: cleanName,
      measure: cleanMeasure,
    });
  }

  return items;
}
