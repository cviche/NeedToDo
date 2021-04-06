import React, { Fragment } from "react";
import "./Login.scss";
// import

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
                <button onClick={this.handleSignIn} className="sign-in">
                  Sign In
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <div class="main-body">
          <img src="images/checklist.png" alt="checklist" />
        </div>
      </>
    );
  }
}

export default Login;
