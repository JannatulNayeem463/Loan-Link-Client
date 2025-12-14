import React from 'react'
import AdminProfile from './AdminProfile'
import AllLoansAdmin from './AllLoansAdmin'
import LoanApplications from './LoanApplications'
import ManageUsers from './ManageUsers'
import { Link } from 'react-router'

const Admin = () => {
  return (
    <div className='max-w-7xl bg-gray-200   mx-auto '>
     
      <h3 className='text-center items-center mt-5 text-2xl font-bold pt-10 '> Admin Dashborad</h3>
         <p className='text-center'>Welcome Back, </p>

    <div className='flex mt-10 pb-5 '>

    <div className="card  ml-5 bg-base-100 w-96 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title font-semibold">All Loans</h2>
    
    <div className="card-actions">
    <Link to="/dashboard/all-loan" className="btn bg-cyan-500 text-white mt-5 ">View</Link>
    </div>
  </div>
</div>

{/* 2 */}
<div className="card  ml-5 bg-base-100 w-96 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title font-semibold">Loan Application</h2>
    <div className="card-actions">
    <Link to="/dashboard/loan-application" className="btn bg-cyan-500 text-white mt-5 ">View</Link>
    </div>
  </div>
</div>
{/* 3 */}
<div className="card  ml-5 mr-5 bg-base-100 w-96 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title font-semibold">Manage Users</h2>
   
    <div className="card-actions">
    <Link to="/dashboard/manage-users" className="btn bg-cyan-500 text-white mt-5 ">View</Link>
    </div>
  </div>
</div>
    </div>

    </div>
  )
}

export default Admin
