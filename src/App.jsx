import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  addMealToDay,
  clearAll,
  clearDay,
  loadMealPlan,
  removeMealFromDay,
  saveMealPlan,
} from "./controllers/mealPlanController.js";
import {
  clearShoppingList,
  loadShoppingList,
  saveShoppingList,
} from "./controllers/shoppingListController.js";
import { PageShell } from "./views/components/PageShell.jsx";
import { MealPlannerPage } from "./views/pages/MealPlannerPage.jsx";
import { NotFoundPage } from "./views/pages/NotFoundPage.jsx";
import { RecipeDetailPage } from "./views/pages/RecipeDetailPage.jsx";
import { SearchPage } from "./views/pages/SearchPage.jsx";
import { ShoppingListPage } from "./views/pages/ShoppingListPage.jsx";

export default function App() {
  const [mealPlan, setMealPlan] = useState(() => loadMealPlan());
  const [shoppingItems, setShoppingItems] = useState(() => loadShoppingList());

  useEffect(() => {
    saveMealPlan(mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    saveShoppingList(shoppingItems);
  }, [shoppingItems]);

  function handleAddToMealPlan(day, recipeDetail) {
    setMealPlan((prev) => addMealToDay(prev, day, recipeDetail));
  }

  function handleRemoveMeal(day, index) {
    setMealPlan((prev) => removeMealFromDay(prev, day, index));
  }

  function handleClearDay(day) {
    setMealPlan((prev) => clearDay(prev, day));
  }

  function handleClearAll() {
    setMealPlan((prev) => clearAll(prev));
  }

  function handleClearShopping() {
    setShoppingItems(() => clearShoppingList());
  }

  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route
          path="/recipe/:id"
          element={<RecipeDetailPage onAddToMealPlan={handleAddToMealPlan} />}
        />
        <Route
          path="/planner"
          element={
            <MealPlannerPage
              mealPlan={mealPlan}
              onRemoveMeal={handleRemoveMeal}
              onClearDay={handleClearDay}
              onClearAll={handleClearAll}
            />
          }
        />
        <Route
          path="/shopping"
          element={
            <ShoppingListPage
              mealPlan={mealPlan}
              shoppingItems={shoppingItems}
              onSetShoppingItems={setShoppingItems}
              onClearShopping={handleClearShopping}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageShell>
  );
}
