import { dummyData } from '@/data';
import { create } from 'zustand'

export type IngredientType = {
  name: string;
  unit: "g" | "l" | "ml" | "nos"
  quantity: number
}

export type RecipeType = {
  id: string
  title: string
  description: string
  ingredients: IngredientType[]
  isArchived?: boolean
  createdAt?: Date
}

interface RecipeState {
  recipes: RecipeType[]
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  
  // Recipe actions
  addRecipe: (recipe: RecipeType) => void
  findRecipe: (id: string) => RecipeType | undefined
  deleteRecipe: (id: string) => void
  archiveRecipe: (id: string) => void
  unarchiveRecipe: (id: string) => void
  updateRecipe: (id: string, recipe: Omit<RecipeType, 'id' | 'isArchived' | 'createdAt'>) => void
  
  // Search actions
  setSearchQuery: (query: string) => void
  
  // Pagination actions
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  
  // Computed values
  getFilteredRecipes: () => RecipeType[]
  getActiveRecipes: () => RecipeType[]
  getArchivedRecipes: () => RecipeType[]
  getPaginatedRecipes: () => RecipeType[]
  getTotalPages: () => number
}

export const useRecipeStore = create<RecipeState>()((set, get) => {
  return {
    recipes: dummyData,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 6,
    
    addRecipe: (recipe: RecipeType) => {
      const currentRecipes: RecipeType[] = get().recipes
      const newRecipe = {
        ...recipe,
        isArchived: false,
        createdAt: new Date()
      }
      set({ recipes: [...currentRecipes, newRecipe] })
    },
    
    findRecipe: (id: string) => {
      const recipes = get().recipes
      return recipes.find((recipe) => recipe.id === id)
    },
    
    deleteRecipe: (id: string) => {
      const recipes = get().recipes
      set({ recipes: recipes.filter(recipe => recipe.id !== id) })
    },
    
    archiveRecipe: (id: string) => {
      const recipes = get().recipes
      set({
        recipes: recipes.map(recipe =>
          recipe.id === id ? { ...recipe, isArchived: true } : recipe
        )
      })
    },
    
    unarchiveRecipe: (id: string) => {
      const recipes = get().recipes
      set({
        recipes: recipes.map(recipe =>
          recipe.id === id ? { ...recipe, isArchived: false } : recipe
        )
      })
    },
    
    updateRecipe: (id: string, updatedRecipe: Omit<RecipeType, 'id' | 'isArchived' | 'createdAt'>) => {
      const recipes = get().recipes
      set({
        recipes: recipes.map(recipe =>
          recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
        )
      })
    },
    
    setSearchQuery: (query: string) => {
      set({ searchQuery: query, currentPage: 1 })
    },
    
    setCurrentPage: (page: number) => {
      set({ currentPage: page })
    },
    
    setItemsPerPage: (items: number) => {
      set({ itemsPerPage: items, currentPage: 1 })
    },
    
    getFilteredRecipes: () => {
      const { recipes, searchQuery } = get()
      if (!searchQuery.trim()) return recipes
      
      const query = searchQuery.toLowerCase()
      return recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query))
      )
    },
    
    getActiveRecipes: () => {
      const filtered = get().getFilteredRecipes()
      return filtered.filter(recipe => !recipe.isArchived)
    },
    
    getArchivedRecipes: () => {
      const filtered = get().getFilteredRecipes()
      return filtered.filter(recipe => recipe.isArchived)
    },
    
    getPaginatedRecipes: () => {
      const { currentPage, itemsPerPage } = get()
      const active = get().getActiveRecipes()
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return active.slice(startIndex, endIndex)
    },
    
    getTotalPages: () => {
      const { itemsPerPage } = get()
      const active = get().getActiveRecipes()
      return Math.ceil(active.length / itemsPerPage)
    }
  }
})