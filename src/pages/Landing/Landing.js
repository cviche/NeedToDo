import React, { Fragment } from "react";
import "./Landing.scss";
import checklist from "../images/checklist.png";
import { Link } from "react-router-dom";
import backend_host from "../host";
import { login, authenticate } from "../api_calls";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Redirects to home page if the user is authenticated.
  componentDidMount = async () => {
    const auth_successful = await authenticate(backend_host);
    if (auth_successful === true) {
      console.log("We are pushing the user to the home page");
      this.props.history.push("/home");
    }
    return;
  };

  handleSignIn = () => {
    console.log("Hello world");
  };

  render() {
    return (
      <>
        <header className="header">
          <nav className="nav">
            <ul className="ul">
              <li className="li">
                <button onClick={this.handleSignIn} className="logo-text">
                  NeedToDo
                </button>
              </li>
              <li className="li">
                <Link to="/login" className="sign-in">
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="main-body">
          <img src={checklist} alt="checklist" className="checklist-img" />
          <section className="sign-in-section">
            <div>
              <h1 className="catch">Start doing what you</h1>
              <h3 className="subcatch">
                A simple web app that lets you add and complete tasks.
              </h3>
            </div>

            <div>
              <form onSubmit={this.handleSubmit} className="sign-in-info">
                <label>
                  <input
                    type="text"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                    className="input-style"
                  />
                </label>
                <label>
                  <input
                    type="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    className="input-style"
                  />
                </label>
                <input
                  type="submit"
                  value="Become productive"
                  className="submit-style"
                />
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Landing;
