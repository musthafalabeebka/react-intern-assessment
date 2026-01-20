# 👵 Grandma's Recipe Collection

A beautiful, modern recipe management application built with React, TypeScript, and Tailwind CSS. Help grandma save her delicious recipes before she forgets them!

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [UI Components](#-ui-components)
- [State Management](#-state-management)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality

- ✅ **Create Recipes** - Add new recipes with title, description, and dynamic ingredients
- ✅ **Edit Recipes** - Update existing recipes with pre-filled forms
- ✅ **Delete Recipes** - Remove recipes with beautiful confirmation dialogs
- ✅ **Archive System** - Archive recipes temporarily and restore them later
- ✅ **Search** - Real-time search across titles, descriptions, and ingredients
- ✅ **Pagination** - Browse recipes 6 at a time with smooth navigation

### User Experience

- 🎨 **Beautiful UI** - Modern, clean design with Shadcn UI components
- 🌗 **Dark Mode** - Full dark mode support with perfect color schemes
- 📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎭 **Animations** - Smooth transitions and delightful micro-interactions
- 🎨 **Colorful Alerts** - Color-coded confirmation dialogs (Red/Green/Blue/Amber)
- 🔔 **Toast Notifications** - Beautiful, colorful feedback for all actions
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation

### Data Features

- 📊 **Dynamic Ingredients** - Add/remove ingredients with quantity and unit selection
- 🔍 **Smart Filtering** - Search filters across all recipe fields
- 📄 **Pagination** - Efficient data display with page navigation
- 💾 **State Management** - Reactive updates with Zustand
- 🔄 **Real-time Updates** - UI updates instantly without page refresh

---

## 🛠 Tech Stack

### Frontend Framework

- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### State Management & Forms

- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Routing & Navigation

- **React Router v6** - Client-side routing
- **Dynamic Routes** - Edit pages with URL parameters

### Notifications

- **Sonner** - Modern toast notifications with colors

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/musthafalabeebka/react-intern-assessment
   cd react-intern-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Shadcn UI components**

   ```bash
   npx shadcn@latest add button card input textarea label form
   npx shadcn@latest add select sonner alert-dialog pagination dialog
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
react-intern-assessment/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components (don't edit)
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── ...
│   │   ├── create/
│   │   │   ├── create-form.tsx    # Recipe creation form
│   │   │   └── edit-form.tsx      # Recipe edit form
│   │   ├── recpies/
│   │   │   ├── recipe-card.tsx    # Recipe card component
│   │   │   ├── recipe-list.tsx    # Recipe grid/list
│   │   │   ├── recipe-detailed.tsx # Detailed view modal
│   │   │   └── recipe-info.tsx
│   │   ├── archive.tsx            # Archive page component
│   │   ├── header.tsx             # App header
│   │   └── navigation.tsx         # Navigation menu
│   ├── pages/
│   │   ├── home.tsx               # Home page with recipes
│   │   ├── create.tsx             # Create recipe page
│   │   ├── edit.tsx               # Edit recipe page
│   │   └── archive.tsx            # Archive page
│   ├── store/
│   │   └── recipes.ts             # Zustand store
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── layout.tsx                 # App layout wrapper
│   ├── routes.tsx                 # Route definitions
│   ├── data.ts                    # Sample data
│   └── main.tsx                   # App entry point
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎯 Core Features

### 1. Create Recipe

**Location:** `/create`

**Features:**

- Dynamic ingredient list (add/remove)
- Form validation with Zod
- Unit selection (mg, ml, l, nos)
- Success toast notification
- Auto-redirect to home

**Code Example:**

```typescript
const handleSubmit = (values: RecipeFormValues) => {
  const newRecipe = {
    id: Date.now().toString(),
    title: values.title,
    description: values.description,
    ingredients: values.ingredients,
  };
  addRecipe(newRecipe);
  toast.success("Recipe Created!");
  navigate("/");
};
```

---

### 2. Edit Recipe

**Location:** `/edit/:id`

**Features:**

- Pre-filled form with existing data
- Same validation as create
- Update recipe in place
- Success feedback
- URL parameter routing

**Code Example:**

```typescript
useEffect(() => {
  if (recipe) {
    form.reset({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
    });
  }
}, [recipe, form]);
```

---

### 3. Delete Recipe

**Features:**

- Color-coded confirmation dialog (Red)
- Prevents accidental deletion
- Works from home and archive
- Error toast notification
- Instant UI update

**Code Example:**

```typescript
<AlertDialog open={showDeleteDialog}>
  <AlertDialogContent variant="destructive">
    <AlertDialogTitle>Delete Recipe?</AlertDialogTitle>
    <AlertDialogAction variant="destructive" onClick={handleDelete}>
      Delete Recipe
    </AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

---

### 4. Archive System

**Location:** `/archive`

**Features:**

- Temporary storage for recipes
- Restore with confirmation (Green dialog)
- Delete permanently (Red dialog)
- Separate page view
- Recipe count display

**Code Example:**

```typescript
const handleArchive = () => {
  archiveRecipe(recipe.id);
  toast.info("Recipe Archived");
};

const handleUnarchive = () => {
  unarchiveRecipe(recipe.id);
  toast.success("Recipe Restored");
};
```

---

### 5. Search Feature

**Location:** Home page

**Features:**

- Real-time filtering
- Searches title, description, ingredients
- Case-insensitive
- Resets pagination
- Shows result count

**Code Example:**

```typescript
getFilteredRecipes: () => {
  const { recipes, searchQuery } = get();
  if (!searchQuery.trim()) return recipes;

  const query = searchQuery.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(query)),
  );
};
```

---

### 6. Pagination

**Features:**

- 6 recipes per page
- Previous/Next navigation
- Page number indicators
- Auto-scroll to top
- Only shows when needed

**Code Example:**

```typescript
getPaginatedRecipes: () => {
  const { currentPage, itemsPerPage } = get();
  const active = get().getActiveRecipes();
  const startIndex = (currentPage - 1) * itemsPerPage;
  return active.slice(startIndex, startIndex + itemsPerPage);
};
```

---

## 🎨 UI Components

### Alert Dialogs

Beautiful, color-coded confirmation dialogs:

| Variant       | Color    | Icon             | Use Case        |
| ------------- | -------- | ---------------- | --------------- |
| `destructive` | 🔴 Red   | ❌ XCircle       | Delete actions  |
| `success`     | 🟢 Green | ✅ CheckCircle   | Restore, Create |
| `warning`     | 🟡 Amber | ⚠️ AlertTriangle | Warnings        |
| `info`        | 🔵 Blue  | ℹ️ Info          | Information     |

**Features:**

- Colored header bars
- Automatic icons
- Blurred backdrop
- Smooth animations
- Dark mode support

---

### Toast Notifications

Position: Bottom-right

**Types:**

- `toast.error()` - 🔴 Red (Delete)
- `toast.success()` - 🟢 Green (Create, Update, Restore)
- `toast.info()` - 🔵 Blue (Archive, Info)
- `toast.warning()` - 🟡 Amber (Warnings)

**Features:**

- Colored backgrounds
- Auto-dismiss (3 seconds)
- Rich colors
- Expandable
- Dark mode support

---

### Recipe Card

**Features:**

- Responsive grid layout
- Hover effects
- Color-coded action buttons:
  - View - Default
  - Edit - Blue hover
  - Archive - Amber hover
  - Delete - Red hover
- Ingredient preview (3 max)
- Title/description truncation
- Visual separator for ingredients

---

## 🗄 State Management

### Zustand Store

**Location:** `src/store/recipes.ts`

**State:**

```typescript
{
  recipes: RecipeType[]
  searchQuery: string
  currentPage: number
  itemsPerPage: number
}
```

**Actions:**

- `addRecipe(recipe)` - Create new recipe
- `updateRecipe(id, recipe)` - Update existing recipe
- `deleteRecipe(id)` - Delete recipe
- `archiveRecipe(id)` - Archive recipe
- `unarchiveRecipe(id)` - Restore recipe
- `setSearchQuery(query)` - Update search
- `setCurrentPage(page)` - Change page

**Computed Getters:**

- `getFilteredRecipes()` - Get filtered recipes
- `getActiveRecipes()` - Get non-archived recipes
- `getArchivedRecipes()` - Get archived recipes
- `getPaginatedRecipes()` - Get current page recipes
- `getTotalPages()` - Get total page count
- `findRecipe(id)` - Find recipe by ID

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add custom colors
    }
  }
}
```

### Toast Position

Edit `src/layout.tsx`:

```typescript
<Toaster
  position="bottom-right"  // Change position
  toastOptions={{...}}
/>
```

Options: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### Pagination Items

Edit `src/store/recipes.ts`:

```typescript
itemsPerPage: 6,  // Change to any number
```

### Dark Mode

Automatic! Uses system preference. Toggle in your OS settings.

---

## 📸 Screenshots

### Home Page

- Grid layout with recipe cards
- Search bar at top
- Pagination at bottom
- Recipe count display

### Create/Edit Page

- Form with validation
- Dynamic ingredient fields
- Add/remove ingredients
- Cancel/Save buttons

### Archive Page

- Dimmed recipe cards
- Restore button (green)
- Delete button (red)
- Empty state message

### Alerts & Toasts

- Colored confirmation dialogs
- Bottom-right toast notifications
- Smooth animations

---

## 🧪 Testing

### Manual Testing Checklist

**Create:**

- [ ] Can create recipe with valid data
- [ ] Validation prevents invalid data
- [ ] Success toast appears
- [ ] Redirects to home
- [ ] Recipe appears in list

**Edit:**

- [ ] Form pre-fills with data
- [ ] Can modify all fields
- [ ] Can add/remove ingredients
- [ ] Changes save correctly
- [ ] UI updates immediately

**Delete:**

- [ ] Confirmation dialog appears
- [ ] Cancel button works
- [ ] Delete removes recipe
- [ ] Toast notification shows
- [ ] UI updates without refresh

**Archive:**

- [ ] Archive moves to archive page
- [ ] Recipe disappears from home
- [ ] Can restore from archive
- [ ] Can delete from archive
- [ ] Both dialogs work

**Search:**

- [ ] Filters by title
- [ ] Filters by description
- [ ] Filters by ingredient
- [ ] Case insensitive
- [ ] Updates in real-time

**Pagination:**

- [ ] Shows 6 per page
- [ ] Next/Previous work
- [ ] Page numbers clickable
- [ ] Hides when ≤6 recipes
- [ ] Scrolls to top on change

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Toasts not showing

- **Fix:** Check `<Toaster />` is in `layout.tsx`

**Issue:** Recipes not updating after edit

- **Fix:** Ensure `useRecipeStore(state => state.recipes)` is called for reactivity

**Issue:** Pagination not working

- **Fix:** Use `getPaginatedRecipes()` instead of direct recipes

**Issue:** Search not filtering

- **Fix:** Check `searchQuery` state is being set correctly

**Issue:** Dark mode colors look wrong

- **Fix:** Ensure dark mode colors defined in `alert-dialog.tsx`

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Sonner](https://sonner.emilkowal.ski)

---

## 🤝 Contributing

This is an internship assessment project. If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

This project is created as part of a React internship assessment.

---

## 👨‍💻 Developer

Built with ❤️ for Grandma's recipes

### Assessment Features Completed:

- ✅ Create Recipe
- ✅ Delete Recipe
- ✅ Search Functionality
- ✅ Pagination
- ✅ Archive System
- ✅ Edit Recipe (Bonus)
- ✅ Colorful UI (Bonus)
- ✅ Toast Notifications (Bonus)
- ✅ Dark Mode (Bonus)

---

## 🎉 Acknowledgments

- **Grandma** - For all the delicious recipes
- **Shadcn** - For beautiful UI components
- **Vercel** - For React ecosystem
- **Tailwind Labs** - For Tailwind CSS

---

Made with 👵 and ❤️ - Save Grandma's Recipes!
