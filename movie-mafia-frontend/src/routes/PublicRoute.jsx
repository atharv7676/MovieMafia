import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom';

function PublicRoute() {

  const {isAuthenticated, loading} = useAuth();

  if(loading){
    return <div>Loading...</div>
  }

  if(isAuthenticated){
    return <Navigate to="/" replace/>
  }

  return <Outlet/>
}

export default PublicRoute
