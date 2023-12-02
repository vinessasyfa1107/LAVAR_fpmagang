import { Routes, Route, Navigate, Router } from '@solidjs/router';
// import { AsyncResource } from 'async_hooks';
import { Component, lazy } from 'solid-js';
import Logout from '../containers/logout/logout';
// import Profile from '../containers/profile/profile';
// import EditProfile from '../containers/profile/edit-profile/edit-profile';



const Login = lazy(() => import('../containers/login/login'));
const SignUp = lazy(() => import('../containers/signup/signup'));
const AboutUs = lazy(() => import('../containers/aboutus/aboutus'));
const Profile = lazy(() => import('../containers/profile/profile'));
const EditProfile = lazy(() => import('../containers/profile/edit-profile/edit-profile'));
const Home = lazy(() => import('../containers/users/home/home'));
const Unggah_resep = lazy(() => import('../containers/unggah_resep/unggah_resep'));

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
            <Route path="/profile" component={Profile}/>
            <Route path="/editprofile" component={EditProfile}/>
            <Route path="/home" component={Home} />
            <Route path="/unggah_resep" component={Unggah_resep} />
        </Routes>
        // </Router>
    )
}

export default RouteData;