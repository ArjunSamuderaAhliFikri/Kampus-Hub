/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import CollegePage from "./components/pages/CollegePage.tsx";
import NewsPage from "./components/pages/NewsPage.tsx";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { LayoutSearchAnythingProvider } from "./context/useSearchAnythingContext.tsx";
import AddCollege from "./components/pages/AddCollege.tsx";
import Login from "./components/pages/auth/Login.tsx";
import Register from "./components/pages/auth/Register.tsx";
import { AuthContextProvider } from "./context/useAuthContext.tsx";
import AdminRoute from "./components/guards/AdminRoute.tsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <LayoutSearchAnythingProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </LayoutSearchAnythingProvider>
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/berita",
        element: <NewsPage />,
      },
      {
        path: "/mahasiswa",
        element: <CollegePage />,
      },
      {
        path: "/mahasiswa/tambah-mahasiswa",
        element: (
          <AdminRoute>
            <AddCollege />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
