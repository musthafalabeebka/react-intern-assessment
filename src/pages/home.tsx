import RecipeList from "@/components/recpies/recipe-list"
import { Input } from "@/components/ui/input"
import { useRecipeStore } from "@/store/recipes"
import { Search } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Home() {
  const searchQuery = useRecipeStore(state => state.searchQuery)
  const setSearchQuery = useRecipeStore(state => state.setSearchQuery)
  const currentPage = useRecipeStore(state => state.currentPage)
  const setCurrentPage = useRecipeStore(state => state.setCurrentPage)
  const getTotalPages = useRecipeStore(state => state.getTotalPages)
  const getActiveRecipes = useRecipeStore(state => state.getActiveRecipes)
  useRecipeStore(state => state.recipes)
  
  const totalPages = getTotalPages()
  const activeRecipes = getActiveRecipes()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Grandma's Recipe Collection</h1>
          <p className="text-muted-foreground">
            {activeRecipes.length} {activeRecipes.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search recipes by title, description, or ingredients..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Recipe List */}
        {activeRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? 'No recipes found matching your search.' : 'No recipes yet. Start by creating one!'}
            </p>
          </div>
        ) : (
          <RecipeList />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}