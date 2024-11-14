import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import DashboardTemplate from "../components/layout/dashboardTemplate";
import AuthTemplate from "../components/layout/authTemplate";
import HomePage from "../components/home";
import ErrorPage from "../components/pages/errorPage";

import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Profile from "../components/profile";
import BoardUser from "../components/board-user.component";
import BoardModerator from "../components/board-moderator.component";
import BoardAdmin from "../components/board-admin.component";

import AddTutorial from "../components/pages/tutorial/add";
import Tutorial from "../components/pages/tutorial/detail";
import TutorialsList from "../components/pages/tutorial/list";

// Component to protect routes
const ProtectedRoute = ({ element }) => {
    const user = AuthService.getCurrentUser();
    return user ? element : <Navigate to="/auth/login" />;
};

// Component to public routes
const PublicRoute = ({ element }) => {
    const user = AuthService.getCurrentUser();
    return user ? <Navigate to="/" /> : element;
};

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute element={<DashboardTemplate />} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to="home" />, // Redirect /dashboard to /dashboard/home
            },
            {
                path: "home",
                element: <HomePage />,
            },
        ],
    },
    {
        path: "auth",
        element: <PublicRoute element={<AuthTemplate />} />, // Protect login/register for authenticated users
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to="login" />, // Redirect /auth to /auth/login
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default AppRouter;
