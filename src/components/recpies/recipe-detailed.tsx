import type { RecipeType } from "@/store/recipes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RecipeDetailedProps {
  recipe: RecipeType
  onClose: () => void
}

export default function RecipeDetailed({ recipe, onClose }: RecipeDetailedProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          {/* Ingredients Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recipe Info */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Total ingredients: {recipe.ingredients.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}