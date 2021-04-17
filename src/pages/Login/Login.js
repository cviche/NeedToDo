import React, { Fragment } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleLogin = () => {};

  // handleChange;

  render() {
    return (
      <Fragment>
        <section className="title-container">
          <Link to="/" className="title-text">
            NeedToDo
          </Link>
          <form className="form-container">
            <input
              type="text"
              name="username"
              className="input-style"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              className="input-style"
              placeholder="Password"
            />
            <input type="submit" value="Login" className="login-button" />
          </form>
        </section>
      </Fragment>
    );
  }
}
export default Login;
