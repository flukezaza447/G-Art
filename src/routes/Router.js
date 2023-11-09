import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layouts/layout";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/loginPage", element: <LoginPage /> }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
