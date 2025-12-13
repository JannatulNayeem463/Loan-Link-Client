import React from 'react'
import { Link, Outlet } from 'react-router'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GrUserManager } from 'react-icons/gr';
import { BiAnalyse } from 'react-icons/bi';
import { IoMdHome } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';


const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open bg-cyan-50">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    
    <nav className="navbar w-full bg-base-300" aria-label="open sidebar">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4 text-3xl font-bold"><span className="text-cyan-400">LoanLink</span> Dashboard</div>
    </nav>
   {/* page content */}

    <div >
    <Outlet></Outlet>
    </div>



 
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow pt-10">
        {/* List item */}
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
            {/* Home icon */}
            <IoMdHome />
            <span className="is-drawer-close:hidden font-semibold">Home</span>
          </Link>
        </li>
         

        <li>
          <Link to="/dashboard/admin" className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-10 pt-3" data-tip="Admin">
            {/* admin icon */}
           
            <MdOutlineAdminPanelSettings />
            <span className="is-drawer-close:hidden font-bold ">Admin</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard/manager" className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3" data-tip="Manager">
            {/* Manager icon */}
            <GrUserManager />
            <span className="is-drawer-close:hidden font-bold">Manager</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard/borrower" className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3" data-tip="Borrower">
            {/* Borrower icon */}
            <BiAnalyse />
            <span className="is-drawer-close:hidden font-bold">Borrower</span>
          </Link>
        </li>
        {/* List item */}
        
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-80 pt-2 pb-2" data-tip="Settings">
            {/* Settings icon */}
            <CiSettings />
            <span className="is-drawer-close:hidden font-semibold">Settings</span>
           

          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Dashboard
