import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from './../function/checkAuth'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
        render = {(props) => checkAuth() === false ? <Redirect to="/login"/> : <Component {...rest}/>}
        />
    )
}

export default PrivateRoute;