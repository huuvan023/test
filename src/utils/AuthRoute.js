import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from './../function/checkAuth'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
    render = {(props) => checkAuth() === true ? <Redirect to="/"/> : <Component {...rest}/>}
    />
)

export default AuthRoute;