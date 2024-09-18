import axios from "axios";
import { loginState } from "./StateApiCalls";

export const signup = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/signup", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addNotes = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addnotesform", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addCurrentCondition = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addCurrentCondition", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addFamilyHistory = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addFamilyHistory", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addMedicalHistory1 = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addMedicalHistory1", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addMedicalHistory2 = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addMedicalHistory2", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addIntakeForm = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addIntakeForm", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const addInsuranceInfo = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:80/api/addinsuranceinfo", input)
      .then((response) => {
        console.log("response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        reject(error.response.data);
      });
  });
};

export const login = (email, password, setUser) => {
  axios
    .get(`http://localhost:80/api/login`, {
      params: {
        email,
        password,
      },
    })
    .then((response) => {
      setUser(response.data);
      loginState(email, password);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUser = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:80/api/searchUserByEmail/", {
        params: { email },
      })
      .then((response) => {
        const { user } = response.data;
        resolve(user.first_name);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const changePassword = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://localhost:80/api/forgetpassword/", {
        email: email,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
