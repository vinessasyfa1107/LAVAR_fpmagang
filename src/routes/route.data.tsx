import { Routes, Route, Navigate, Router } from '@solidjs/router';
// import { AsyncResource } from 'async_hooks';
import { Component, lazy } from 'solid-js';
import Logout from '../containers/logout/logout';
import Profile from '../containers/profile/profile';
import NavbarOut from '../containers/navbar/navbar-visit/navbar-out';



const Login = lazy(() => import('../containers/login/login'));
const SignUp = lazy(() => import('../containers/signup/signup'));
const AboutUs = lazy(() => import('../containers/aboutus/aboutus'));

const Home = lazy(() => import('../containers/users/home/home'));

const getPath = () => {
    return "/home";
}

const RouteData: Component = () => {
    return (
        // <Router>
        <Routes>

            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/logout" component={Logout}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/home" component={Home} />
        </Routes>
        // </Router>
    )
}

export default RouteData;