export function registerUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/userRegistration",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function authenticateUser(authDetail) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/api/userLogin", {
      method: "POST",
      body: JSON.stringify(authDetail),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      const token = data.token;
      localStorage.setItem("token", token);
      resolve({ data });
    } else {
      resolve({ data });
    }
  });
}

export function addData(tasks) {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    console.log(tasks);
    console.log(token);
    const response = await fetch("http://localhost:8000/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(tasks),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItems() {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/api/usertasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItem(itemId) {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/api/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(itemId),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function findIndItem(itemId) {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/api/getTaskByIdApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(itemId),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateItem(updatedItem) {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/api/updateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    resolve({ data });
  });
}
