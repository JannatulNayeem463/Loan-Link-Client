import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../pages/Home";
import AuthLayout from "../main/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllLoans from "../pages/AllLoans";
import { Component } from "react";
import LoanDetails from "../pages/LoanDetails";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Dashboard from "../main/Dashboard";
import LoanApplicationForm from "../pages/LoanApplicationForm";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashborad/Admin/ManageUsers";
import Admin from "../pages/Dashborad/Admin/Admin";
import AdminProfile from "../pages/Dashborad/Admin/AdminProfile";
import AllLoansAdmin from "../pages/Dashborad/Admin/AllLoansAdmin";
import LoanApplications from "../pages/Dashborad/Admin/LoanApplications";
import EditLoan from "../pages/Dashborad/EditLoan";
import EditLoans from "../pages/Dashborad/Admin/EditLoans";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/all-loans",
        Component: AllLoans,
      },
       {
        path:"/loan-details",
       Component: LoanDetails,
       },
       {
        path: "/about",
        Component: AboutUs,
       },
       {
        path: "/contact",
        Component: Contact,
       },
       {
        path:"loan/:id",
        Component: LoanDetails,
       },
       {
        path:"apply-loan/:id",
        Component: LoanApplicationForm,
       },

      

    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
    children: [
      {
        path:"admin",
        Component: Admin,

      },
     {
      path: 'manage-users',
     Component: ManageUsers,
     },
     {
      path:"admin-profile",
      Component: AdminProfile,
     },
     {
      path: "all-loan",
      Component: AllLoansAdmin,
     },
     {
     path:"loan-application",
     Component: LoanApplications,
     },
     {
       path: "edit-loan/:id",
        Component: EditLoan,
     },
     {
      path: "editloan/:id",
        Component: EditLoans,
     },
    ],
  },

]);
