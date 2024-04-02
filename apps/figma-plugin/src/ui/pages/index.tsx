import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ColorTokenPage } from "./ColorTokenPage";
import { PageLayout } from "./PageLayout";

export const Pages = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { path: "/", element: <ColorTokenPage />, index: true },
        { path: "/color", element: <ColorTokenPage /> },
        { path: "/text", element: <></> },
        { path: "/effect", element: <></> },
        { path: "/etc", element: <></> },
        { path: "*", element: "404" },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
