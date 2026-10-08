/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import CollegePage from "./components/pages/CollegePage.tsx";
import NewsPage from "./components/pages/NewsPage.tsx";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
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
        path: "*",
        element: (
          <div>
            <h1>404 Page not found!</h1>
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
