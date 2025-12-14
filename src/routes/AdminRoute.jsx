import React, { Children } from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {

    const { loading } =useAuth();
    const { role ,roleLoading } = useRole()

    if (loading || roleLoading) {
        return <div> Loading </div>
    }
    if (role !== 'admin'){
        return <div className='card bg-white'> Forbidden </div>
    }
  return children;
};
export default AdminRoute
