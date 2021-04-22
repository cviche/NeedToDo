import axios from "axios";

// This function makes sure that the user has
// a JWT token which will let them stay on the website.
// Otherwise, they will get redirected to the login page.
export const authenticate = async (backend_host, state) => {
  try {
    axios
      .post(`${backend_host}/authenticate`, state, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        console.log("Frontend: Successfully stored token in local storage.");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return -1;
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
