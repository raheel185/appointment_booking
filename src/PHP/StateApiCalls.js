import axios from "axios";

export const loginState = async (email, password) => {
  try {
    const response = await axios.get("http://localhost:8080/api/login", {
      params: { email, password },
    });
    if (response.data.status === "success") {
      console.log("User logged in:", response.data.user);
    } else {
      console.log("Error:", response.data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
