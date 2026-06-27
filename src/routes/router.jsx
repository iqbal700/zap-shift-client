import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Rider from "../pages/Rider/BeARider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import BeARider from "../pages/Rider/BeARider";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagements from "../pages/Dashboard/UsermanageMents/UsersManagements";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import AssignedDeliveries from "../pages/Dashboard/AssignedDelivaries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../pages/Dashboard/completedDeliveries/CompletedDeliveries";
import TrackingParcel from "../pages/TrackingParcel/TrackingParcel";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

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
          element: <PrivateRouter> <BeARider></BeARider> </PrivateRouter>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
       },
       {
          path: 'send-parcel',
          element: <PrivateRouter><SendParcel></SendParcel></PrivateRouter>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
       },
       {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/warehouses.json').then(res => res.json())

       },
       {
        path: 'tracking-parcel/:trackingId',
        Component: TrackingParcel,
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
  },
  {
    path: 'dashboard',
    element: <PrivateRouter><DashboardLayout> </DashboardLayout></PrivateRouter>,
    children: [
      {
        index: true,
        Component: DashboardHome

      },
      {
          path: 'my-parcels',
          Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },

      // ==-== Admin Only Routes ==-== //

      {
        path: 'assigned-deliveries',
        element: <RiderRoute> <AssignedDeliveries> </AssignedDeliveries> </RiderRoute> 
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoute> <CompletedDeliveries></CompletedDeliveries> </RiderRoute> 
      },

      // ==-== Admin Only Routes ==-== //
      {
        path: 'approve-riders',
        element : <AdminRoute> <ApproveRiders></ApproveRiders> </AdminRoute>
      },
      {
        path: 'users-management',
        element : <AdminRoute> <UsersManagements></UsersManagements> </AdminRoute>
      },
      {
        path: 'assign-riders',
        element : <AdminRoute> <AssignRider> </AssignRider> </AdminRoute>
      }
    ]
  }
]);