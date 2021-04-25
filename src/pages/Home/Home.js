import React, { Fragment } from "react";
import "./Home.scss";
import { authenticate, addTask, fetchTask } from "../api_calls";
import backend_host from "../host";
import Tasks from "./Tasks";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      username: "",
      loading: true,
    };
  }

  // Redirects to login page if they are not authenticated.
  componentDidMount = async () => {
    document.body.style.background = "#DAECFC";
    const auth_successful = await authenticate(backend_host);
    console.log("The user we have found is:", auth_successful);
    if (auth_successful === false) {
      console.log("We are pushing the user to the home page");
      this.props.history.push("/login");
    }
    this.setState({ username: auth_successful });
    console.log("cdm done");
    console.log(this.state);

    // Now that we know the user is authenticated, we can fetch their tasks
    // from the database
    const fetched_tasks = await fetchTask(backend_host, {
      username: auth_successful,
    });
    console.log(fetched_tasks);
    this.setState({ notes: fetched_tasks, loading: false });
    // this.setState({ notes: fetched_tasks });
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

  showModal = () => {
    console.log("You have clicked the add button!");
    let modal = document.getElementById("myModal");
    console.log(modal);
    modal.style.display = "flex";
  };

  removeModal = (event) => {
    console.log("You have clicked the modal!");
    let modal = document.getElementById("myModal");
    let close_icon = document.getElementsByClassName("close")[0];
    console.log(modal);
    if (event.target == modal || event.target == close_icon)
      modal.style.display = "none";
  };

  addTask = async (event) => {
    try {
      const task_message = document.getElementById("task");
      const task_message_text = task_message.value;
      task_message.value = "";
      console.log("We are going to add a task....");
      console.log("We are going to add a task....");

      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      const addTask_successful = await addTask(backend_host, {
        username: this.state.username,
        task: task_message_text,
      });
      console.log("We are going to add a task....after");

      console.log(task_message_text);
      console.log("((((((((");
      console.log(addTask_successful);
      console.log("((((((((");
      if (addTask_successful == true) {
        let messages = this.state.notes;
        console.log(messages);
        messages.push(task_message_text);
        this.setState({ notes: messages });
      }
      // setTimeout(1000);
      console.log(this.state);
    } catch (error) {
      console.log(error);
      console.log("There was an error when adding a task");
    }
  };

  removeTask = async (event) => {
    try {
      console.log(event.target);
      console.log("done");
      // const deleteTask_successful = await deleteTask(backend_host, {
      //   username: this.state.username,
      //   task: task_message_text,
      // });

      // if (deleteTask_successful == true) {
      //   let messages = this.state.notes;
      //   console.log(messages);
      //   messages.push(task_message_text);
      //   this.setState({ notes: messages });
      // }
    } catch (error) {
      console.log(error);
      console.log("There was an error when deleting a task");
    }
  };

  render() {
    let list_of_tasks = this.state.notes;
    let displayed_tasks = [];
    let i = "";
    for (let i = 0; i < list_of_tasks.length; i++) {
      displayed_tasks.push(
        <Tasks
          key={i}
          task_text={list_of_tasks[i]}
          date="1/1/21"
          time="2:00pm"
          removeTask={this.removeTask}
        />
      );
    }

    return (
      <Fragment>
        <div id="myModal" className="modal" onClick={this.removeModal}>
          <div className="modal-content">
            <span className="close" onClick={this.removeModal}>
              &times;
            </span>
            {/* <input type="text" placeholder="Enter a task" /> */}
            <textarea
              name="new_task"
              id="task"
              cols="30"
              rows="10"
              placeholder="Enter a new task"
            ></textarea>
            <button className="add-task-button" onClick={this.addTask}>
              Add task
            </button>
          </div>
        </div>
        <header>
          <nav className="home-nav">
            <div></div>
            <ul className="home-ul">
              <li className=""></li>
              <li className="add-icon" onClick={this.showModal}>
                +
              </li>
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
          <div>
            {this.state.notes == false ? (
              <div style={{ margin: "14px" }}>
                You have currently have no tasks. Click the “+” icon above to
                add a task
              </div>
            ) : (
              <div style={{ margin: "14px" }}>
                Click the task to mark it as done.
              </div>
            )}
          </div>
          <div className="notes-list">{displayed_tasks}</div>
        </section>
        <div className="loading-icon">
          {this.state.loading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Home;
