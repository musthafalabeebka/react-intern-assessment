import { useRecipeStore } from "@/store/recipes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArchiveRestore, Trash2 } from "lucide-react"
import { useState } from "react"
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

export default function Archive() {
  const getArchivedRecipes = useRecipeStore(state => state.getArchivedRecipes)
  const unarchiveRecipe = useRecipeStore(state => state.unarchiveRecipe)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  // Subscribe to recipes to trigger re-render on changes
  useRecipeStore(state => state.recipes)
  
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const [restoreDialogId, setRestoreDialogId] = useState<string | null>(null)
  
  const archivedRecipes = getArchivedRecipes()

  const handleUnarchive = (id: string, title: string) => {
    unarchiveRecipe(id)
    setRestoreDialogId(null)
    toast.success("Recipe Restored", {
      description: `${title} has been moved back to your active recipes.`,
    })
  }

  const handleDelete = (id: string, title: string) => {
    deleteRecipe(id)
    setDeleteDialogId(null)
    toast.error("Recipe Deleted", {
      description: `${title} has been permanently removed.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Archived Recipes</h1>
          <p className="text-muted-foreground">
            {archivedRecipes.length} {archivedRecipes.length === 1 ? 'recipe' : 'recipes'} archived
          </p>
        </div>

        {archivedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No archived recipes. Archived recipes will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedRecipes.map((recipe) => (
              <Card key={recipe.id} className="flex flex-col h-full opacity-75 hover:opacity-100 transition-opacity">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {recipe.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Ingredients:</p>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          • {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                        </li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-muted-foreground italic">
                          + {recipe.ingredients.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setRestoreDialogId(recipe.id)}
                  >
                    <ArchiveRestore className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setDeleteDialogId(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogId !== null} onOpenChange={(open) => !open && setDeleteDialogId(null)}>
          <AlertDialogContent variant="destructive">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong className="text-foreground">"{archivedRecipes.find(r => r.id === deleteDialogId)?.title}"</strong>. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                variant="destructive"
                onClick={() => {
                  const recipe = archivedRecipes.find(r => r.id === deleteDialogId)
                  if (recipe) handleDelete(recipe.id, recipe.title)
                }}
              >
                Delete Forever
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Restore Dialog */}
        <AlertDialog open={restoreDialogId !== null} onOpenChange={(open) => !open && setRestoreDialogId(null)}>
          <AlertDialogContent variant="success">
            <AlertDialogHeader>
              <AlertDialogTitle>Restore Recipe?</AlertDialogTitle>
              <AlertDialogDescription>
                Move <strong className="text-foreground">"{archivedRecipes.find(r => r.id === restoreDialogId)?.title}"</strong> back to your active recipe collection?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                variant="success"
                onClick={() => {
                  const recipe = archivedRecipes.find(r => r.id === restoreDialogId)
                  if (recipe) handleUnarchive(recipe.id, recipe.title)
                }}
              >
                Restore Recipe
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}