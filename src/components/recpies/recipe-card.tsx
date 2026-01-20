import { type RecipeType, useRecipeStore } from "@/store/recipes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Archive, Trash2, Eye, Edit } from "lucide-react"
import { useState } from "react"
import RecipeDetailed from "./recipe-detailed"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

interface RecipeCardProps {
  recipe: RecipeType
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const archiveRecipe = useRecipeStore(state => state.archiveRecipe)
  const navigate = useNavigate()
  
  // Get fresh recipe data from store to ensure updates are reflected
  const findRecipe = useRecipeStore(state => state.findRecipe)
  const currentRecipe = findRecipe(recipe.id) || recipe

  const handleDelete = () => {
    deleteRecipe(recipe.id)
    setShowDeleteDialog(false)
    toast.error("Recipe Deleted", {
      description: `${currentRecipe.title} has been removed from your collection.`,
      duration: 3000,
    })
  }

  const handleArchive = () => {
    archiveRecipe(recipe.id)
    toast.success("Recipe Archived", {
      description: `${currentRecipe.title} has been moved to archives.`,
      duration: 3000,
    })
  }

  const handleEdit = () => {
    navigate(`/edit/${recipe.id}`)
  }

  if (showDetails) {
    return <RecipeDetailed recipe={currentRecipe} onClose={() => setShowDetails(false)} />
  }

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1 text-xl">{currentRecipe.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {currentRecipe.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-foreground">Ingredients</p>
            </div>
            <ul className="text-sm space-y-2">
              {currentRecipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex-1">
                    <span className="font-medium text-foreground">{ingredient.name}</span>
                    <span className="text-xs ml-2">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </span>
                </li>
              ))}
              {currentRecipe.ingredients.length > 3 && (
                <li className="text-xs text-muted-foreground italic pl-4">
                  + {currentRecipe.ingredients.length - 3} more ingredient{currentRecipe.ingredients.length - 3 !== 1 ? 's' : ''}
                </li>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setShowDetails(true)}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">View</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleEdit}
            title="Edit Recipe"
            className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleArchive}
            title="Archive Recipe"
            className="hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 dark:hover:bg-amber-950/50"
          >
            <Archive className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            title="Delete Recipe"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-950/50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent variant="destructive">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will permanently delete <span className="font-semibold text-foreground">"{currentRecipe.title}"</span> from your collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete Recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}