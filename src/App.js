import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Header.css";

import ghost from "./ghost.ico"

import AuthService from "./services/auth.service";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Home from "./components/home/home.component";
import History from "./components/history/history.components";
import FAQ from "./components/faq/faq.component";
import Donate from "./components/donate/donate.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
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
    const { currentUser } = this.state;

    return (
      <div>
        <div className="area"></div>
        <nav className="main-menu">
          <div className="navbar-nav mr-auto"></div>
          {currentUser ? (
            <div>
              <li>
                <div className="logo">
                <img className="ico" src={ghost} alt="ghost"></img>
                <span className="nav-text site_name">Ghost Proxy </span>
                </div>
              </li>
              <li>
                  <i className="fas fa fa-user fa-2x user_detal-img"></i>
                    <span className="nav-text user_info">{currentUser.nickname} </span>
                    <span className="nav-text user_info">{currentUser.balance} $</span>
              </li>
              <li>
                <Link to={"/home"} className="nav-text">
                  <i className="fa fa-search fa-2x"></i>
                  <span className="nav-text">Search proxy</span>
                </Link>
              </li>
              <li>
                <Link to={"/history"} className="nav-text">
                  <i className="fa fa-book fa-2x"></i>
                  <span className="nav-text">History</span>
                </Link>
              </li>
              <li>
                <Link to={"/donate"} className="nav-text">
                  <i className="fa fa-money fa-2x"></i>
                  <span className="nav-text">Donate</span>
                </Link>
              </li>
              <li>
                <Link to={"/FAQ"} className="nav-text">
                  <i className="fa fa-question-circle fa-2x"></i>
                  <span className="nav-text">FAQ</span>
                </Link>
              </li>
              <ul className="logout">
                <li>
                  <a href="/login" className="nav-text" onClick={this.logOut}>
                    <i className="fa fa-power-off fa-2x"></i>
                    <span className="nav-text">LogOut</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-text">
                  <i className="fa fa-sign-in fa-2x"></i>
                  <span className="nav-text">Login</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-text">
                  <i className="fa fa-arrow-up fa-2x"></i>
                  <span className="nav-text">Sign Up</span>
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/history" component={History} />
            <Route exact path="/FAQ" component={FAQ} />
            <Route exact path="/donate" component={Donate} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>

        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
