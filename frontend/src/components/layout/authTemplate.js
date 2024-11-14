import React, { Component } from "react";
import { Outlet } from "react-router-dom";

class AuthTemplate extends Component {
    render() {
        return (
            <div className="container mt-3">
                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>
        );
    }
}

export default AuthTemplate;
