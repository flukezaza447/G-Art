import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layouts/layout";
import LoginPage from "../pages/LoginPage";
import RejisterPage from "../pages/RejisterPage";
import PostDetailPage from "../pages/PostDetailPage";
import TagPage from "../pages/TagPage";
import ProfilePage from "../pages/ProfilePage";
import CreatePostPage from "../pages/CreatePostPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/postDetailPage", element: <PostDetailPage /> },
      { path: "/tagPage", element: <TagPage /> },
      { path: "/profilePage", element: <ProfilePage /> },
      { path: "/createPostPage", element: <CreatePostPage /> }
    ]
  },
  { path: "/loginPage", element: <LoginPage /> },
  { path: "/rejisterPage", element: <RejisterPage /> }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
