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

import AllLoansAdmin from "../pages/Dashborad/Admin/AllLoansAdmin";
import LoanApplications from "../pages/Dashborad/Admin/LoanApplications";
import EditLoan from "../pages/Dashborad/EditLoan";
import EditLoans from "../pages/Dashborad/Admin/EditLoans";
import Manager from "../pages/Dashborad/Manager/Manager";
import AddLoan from "../pages/Dashborad/Manager/AddLoan";
import ManageLoans from "../pages/Dashborad/Manager/ManageLoans";
import UpdateLoan from "../pages/Dashborad/Manager/UpdateLoan";
import PendingLoans from "../pages/Dashborad/Manager/PendingLoans";
import ApprovedLoans from "../pages/Dashborad/Manager/ApprovedLoans";
import MyLoans from "../pages/Dashborad/Borrower/MyLoans";
import Borrower from "../pages/Dashborad/Borrower/Borrower";
import ApplyLoan from "../components/ApplyLoan";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import PaymentModal from "../components/Payment/PaymentModal";
import Profile from "../components/profile";


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

      {
        path:"apply-loan",
        Component: ApplyLoan,
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
      path: "all-loan",
      Component: AllLoansAdmin,
     },
     {
     path:"loan-application",
     Component: LoanApplications,
     },
     {
      path: "editloan/:id",
        Component: EditLoans,
     },

  //  manager
  {
    path:"manager",
    Component: Manager,

  },
{
  path:'add-loan',
  Component: AddLoan,

},
{
  path: "manage-loans",
  Component: ManageLoans,
},
{
  path:"update-loan/:id",
  Component: UpdateLoan,
},
{
path:"pending-loans",
Component: PendingLoans,
},

{
  path:"approved-loans",
  Component:ApprovedLoans
},

// Borrower

{
path:"my-loans",
Component: MyLoans,
},
{
  path:"borrower",
  Component:Borrower
},
{
  path:"payment-success",
  Component: PaymentSuccess
},
{
  path:"payment-modal",
  Component: PaymentModal
},
{
path:"profile",
Component: Profile
}

    ],
  },

]);
