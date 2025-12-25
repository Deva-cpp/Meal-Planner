import { fetchMealById, searchMealsByName } from "../services/mealDbService.js";
import {
  normalizeMealDetail,
  normalizeMealSummary,
} from "../models/recipeModel.js";

export async function searchRecipes(query) {
  const { meals } = await searchMealsByName(query);
  return meals.map(normalizeMealSummary).filter(Boolean);
}

export async function getRecipeDetail(id) {
  const { meal } = await fetchMealById(id);
  return normalizeMealDetail(meal);
}
