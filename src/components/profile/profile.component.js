import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";

import "../../Header.css"

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {username: ""}
    };

  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="area">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.nickname}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          
          {/* {console.log(currentUser)} */}
          {localStorage.getItem("user").substring(0, 20)} ...{" "}
          {localStorage.getItem("user").substr(localStorage.getItem("user").length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>

        <p>
          <strong>Balance:</strong>{" "}
          {currentUser.balance}
        </p>
      </div>: null}
      </div>
    );
  }
}
