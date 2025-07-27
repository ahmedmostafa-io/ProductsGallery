import React, { Children } from "react";
import HomePage from "./Home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProductDetails from "./ProductDetails/ProductDetails";
import Error from "./Error/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layout/Layout";
import ThemeContextProvider from "./Context/Theme.context";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "Home",
        element: <HomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Error error={"page Not Found"} className="max-h-[90vh] max-w-screen  " />
    ),
  },
]);
const query = new QueryClient();
export default function App() {
  return (
    <div>
      <QueryClientProvider client={query}>
        <ThemeContextProvider>
          <RouterProvider router={routes} />
        </ThemeContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
