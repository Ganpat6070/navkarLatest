import React from "react";
import "./App.css";
import { Login } from "./auth/Components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./auth/Components/Register";
import TablePage from "./pages/TablePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/table",
      element: <TablePage></TablePage>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
