import React, { Component } from "react";
import Button from "@mui/material/Button";

import UserService from "../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            (response) => {
                this.setState({
                    content: response.data,
                });
            },
            (error) => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString(),
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                    <div className="card">
                        <div className="card-body">
                            <button>Something</button>
                            <Button variant="contained">Hello world</Button>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
