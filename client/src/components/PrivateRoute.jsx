import React, { useContext, useEffect, useState } from 'react';
import { Navigate} from 'react-router-dom';
// import { useAuth } from './AuthContext';
import UserContext from '../context/UserContext';


const PrivateRoute = ({ component : Component, redirectPath ,...rest }) => {
    const { user } = useContext(UserContext);

    return user ? (
    //   <Route {...rest} element={element} />
    <Component {...rest} />
    ) : 
    <Navigate to={redirectPath}/>
  };
  

export default PrivateRoute;