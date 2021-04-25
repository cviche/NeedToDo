import React, { Fragment } from "react";
import "./Home.scss";
import { authenticate } from "../api_calls";
import backend_host from "../host";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{}],
    };
  }

  // Redirects to login page if they are not authenticated.
  componentDidMount = async () => {
    document.body.style.background = "#DAECFC";
    const auth_successful = await authenticate(backend_host);
    if (auth_successful === false) {
      console.log("We are pushing the user to the home page");
      this.props.history.push("/login");
    }
    return;
  };

  handleSignOut = (event) => {
    try {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    } catch (error) {
      console.log(error);
      console.log(
        "There was an error when trying to sign out. Please try again"
      );
    }
  };

  render() {
    return (
      <Fragment>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            {/* <input type="text" placeholder="Enter a task" /> */}
            <textarea
              name="new_task"
              id="task"
              cols="30"
              rows="10"
              placeholder="Enter a new task"
            ></textarea>
            <button className="add-task-button">Add task</button>
          </div>
        </div>
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
            {[1] == false ? (
              <div>Empty array is false</div>
            ) : (
              <div>Empty array is true</div>
            )}
            You have currently have no tasks. Click the “+” icon above to add a
            task
          </p>
        </section>
      </Fragment>
    );
  }
}

export default Home;
