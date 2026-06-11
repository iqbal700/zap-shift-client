import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Rider from "../pages/Rider/Rider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
       {
        index: true,
        Component: Home
       },
       {
          path: 'rider',
          element: <PrivateRouter><Rider> </Rider></PrivateRouter>
       },
       {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/warehouses.json').then(res => res.json())

       }
    ]
  },
  {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);