import axios from "axios";

// This function makes sure that the user has
// a JWT token which will let them stay on the website.
// Otherwise, they will get redirected to the login page.
export const authenticate = async (backend_host) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token === null) {
      console.log("A token does not exist");
      return false;
    }

    // Redirect to home page if the token is valid.
    console.log("A token does exist... Checking to see if the token is valid");

    const auth_successful = await axios.get(`${backend_host}/authenticate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("What happened");
    console.log(auth_successful.data.user);
    console.log("We are in api calls");
    if (auth_successful.status == 200) return auth_successful.data.user;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Logs in a user if the credentials are correct.
export const login = async (backend_host, state) => {
  try {
    const res = await axios.post(`${backend_host}/login`, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Logs in a user if the credentials are correct.
export const register = async (backend_host, state) => {
  try {
    const res = await axios.post(`${backend_host}/register`, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("operation was well");
    console.log(res.data.token);
    return res.data.token;
  } catch (error) {
    console.log("NOT GOOD");
    console.log(error);
    return false;
  }
};

//Adds a task for the user
export const addTask = async (backend_host, state) => {
  try {
    const res = await axios.post(`${backend_host}/addTask`, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.token);
    return res.data.token;
  } catch (error) {
    console.log(error);
    return false;
  }
};
