import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Test } from "./Test";

export const Router = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Test />,
    },
  ]);

  return <RouterProvider router={router} />;
};
