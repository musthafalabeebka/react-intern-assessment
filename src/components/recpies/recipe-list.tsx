import { useRecipeStore } from "@/store/recipes"
import RecipeCard from "./recipe-card"

export default function RecipeList() {
  // Get the function AND subscribe to recipes changes
  const getPaginatedRecipes = useRecipeStore(state => state.getPaginatedRecipes)
  const recipes = getPaginatedRecipes()
  
  // Force re-render when recipes change by subscribing to the recipes state
  useRecipeStore(state => state.recipes)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}