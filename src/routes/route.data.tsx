import { Routes, Route, Navigate, Router } from '@solidjs/router';
// import { AsyncResource } from 'async_hooks';
import { Component, lazy } from 'solid-js';



const Login = lazy(() => import('../containers/login/login'));
const SignUp = lazy(() => import('../containers/signup/signup'));
const AboutUs = lazy(() => import('../containers/aboutus/aboutus'));

const getPath = () => {
    return "/about-us";
}

const RouteData: Component = () => {
    return (
        // <Router>
        <Routes>

            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/about-us" component={AboutUs} />

        </Routes>
        // </Router>
    )
}

export default RouteData;