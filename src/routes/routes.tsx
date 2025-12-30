import type { RouteObject } from "react-router-dom"
import { AppLayout } from "../layouts/AppLayout"
import { ProtectedRoute } from "./ProtectedRoute"
import { PublicRoute } from "./PublicRoute"

// pages
import Home from "../pages/home/Home"
import LoginPage from "../pages/login/LoginPage"
import BakanesPage from "../pages/bakanes/BakanesPage"
import CategoriesActionsPage from "../pages/categoriesActions/CategoriesActionsPage"
import CommunityPage from "../pages/community/CommunityPage"
import ContentPage from "../pages/content/ContentPage"
import MarketplacePage from "../pages/marketplace/MarketplacePage"
import SponsorsPage from "../pages/sponsors/SponsorsPage"
import SocialImpactPage from "../pages/socialImpact/SocialImpactPage"

export const routes: RouteObject[] = [


  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "social-impact", element: <SocialImpactPage /> },
          { path: "community", element: <CommunityPage /> },
          { path: "sponsors", element: <SponsorsPage /> },
          { path: "marketplace", element: <MarketplacePage /> },
          { path: "bakanes", element: <BakanesPage /> },
          { path: "content", element: <ContentPage /> },
          { path: "categories-actions", element: <CategoriesActionsPage /> },
        ],
      },
    ],
  },

  {
    element: <PublicRoute />,
    children:[
      {
        path: "/",
        children: [
          { path: "login", element: <LoginPage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>404 - No encontrado</div>,
  },
]
