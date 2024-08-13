import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import UserContext from '../context/UserContext';
import Alert from 'react-bootstrap/Alert';


const AdminRoute = ({ component: Component, redirectPath, ...rest }) => {
    const { user } = useContext(UserContext);

    if (user) {
        if (user.isAdmin) {
            return <Component {...rest} />
        }
        else {
            return (
                <div className='container' style={{marginBottom: "500px", marginTop:"200px"}}>
                    <Alert variant="danger">
                        <Alert.Heading>Unauthorized</Alert.Heading>
                        <p>
                            This route is only accessible to Admins.
                        </p>
                    </Alert>
                </div>
            )
        }
    }
    else {
        return <Navigate to={redirectPath} />
    }

    return user ? user.isAdmin ? (<Component {...rest} />) : <Navigate to={'/'} /> : <Navigate to={redirectPath} />
};


export default AdminRoute;