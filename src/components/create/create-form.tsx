import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useRecipeStore } from "@/store/recipes"
import { useNavigate } from "react-router-dom"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  unit: z.enum(["g", "l", "ml", "nos"]),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
})

const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title is required").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required"),
})

type RecipeFormValues = z.infer<typeof recipeSchema>

export default function CreateForm() {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const navigate = useNavigate()
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: [{ name: "", unit: "nos", quantity: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const handleSubmit = (values: RecipeFormValues) => {
    const newRecipe = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      ingredients: values.ingredients,
    }
    
    addRecipe(newRecipe)
    
    toast.success("Recipe Created!", {
      description: `${values.title} has been added to your collection.`,
    })
    
    form.reset()
    navigate("/")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter recipe name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your recipe..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Ingredients</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", unit: "nos", quantity: 1 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Ingredient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Qty"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem className="w-24">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nos">nos</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="l">l</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Create Recipe
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}