import Home from "./pages/home"
import Create from "./pages/create"
import Archive from "./pages/archive"
import Edit from "./pages/edit"

const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "create",
    element: <Create />,
    index: false,
  },
  {
    path: "edit/:id",
    element: <Edit />,
    index: false,
  },
  {
    path: "archive",
    element: <Archive />,
    index: false,
  },
]

export default routes