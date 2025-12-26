const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export async function searchMealsByName(query) {
  const trimmed = query.trim();
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(trimmed)}`;
  const data = await fetchJson(url);
  return { meals: data.meals ?? [] };
}

export async function fetchMealById(id) {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const data = await fetchJson(url);
  const meal = Array.isArray(data.meals) ? data.meals[0] : null;
  return { meal };
}
