import React, { Component } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

class DashboardTemplate extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }
    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
            <div className="container mt-3">
                <Navbar
                    currentUser={currentUser}
                    showModeratorBoard={showModeratorBoard}
                    showAdminBoard={showAdminBoard}
                />
                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>
        );
    }
}

export default DashboardTemplate;
