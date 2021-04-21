import React, { Fragment } from "react";
import "./Home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.style.background = "#DAECFC";

    //Authenticate user
  }

  handleSignOut() {}

  render() {
    return (
      <Fragment>
        <header>
          <nav className="home-nav">
            <div></div>
            <ul className="home-ul">
              <li className=""></li>
              <li className="add-icon">+</li>
              <li className="sign-out-button">
                <button
                  className="sign-out-button"
                  onClick={this.handleSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <section className="notes-section">
          <p>
            You have currently have no tasks. Click the “+” icon above to add a
            task
          </p>
        </section>
      </Fragment>
    );
  }
}

export default Home;
