import React from 'react'

import { Link } from 'react-router'

const Borrower = () => {
  return (
    <div className='max-w-7xl bg-gray-200  rounded-2xl  mx-auto '>
     
      <h3 className='text-center items-center mt-5 text-2xl font-bold pt-10 '>Borrower Dashborad</h3>
        

    <div className='flex mt-10 pb-5 '>

    <div className="card  mx-auto bg-base-100 w-96 shadow-sm">
  
  <div className="card-body items-center  text-center">
    <h2 className="card-title font-semibold">My Loans</h2>
    
    <div className="card-actions  items-center">
    <Link to="/dashboard/my-loans" className="btn bg-cyan-500 text-white mt-5 ">View</Link>
    </div>
  </div>
</div>



    </div>

    </div>
  )
}

export default Borrower;
