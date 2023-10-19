import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


export const PrivateRoute = ({ children }) => {
const isAuthorized = Cookies.get('authorized');
console.log(isAuthorized); // Prints the value stored in 'myCookie'

  const location = useLocation();
  

  if (isAuthorized) {
    return children; 
  }
  return <Navigate to={"/login"} state={location.pathname} replace />;
};
