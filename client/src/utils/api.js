import axios from "axios";

export const login = async (user) => {
  try {
    const response = await axios.post(
      "https://taskify-qd27.onrender.com/api/login",
      {
        email: user.email,
        password: user.password,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const signup = async (user) => {
  try {
    const response = await axios.post(
      "https://taskify-qd27.onrender.com/api/register",
      {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (auth) => {
  try {
    const response = await axios.get(
      "https://taskify-qd27.onrender.com/api/user",
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

/** Collection API */

export const createCollection = async (name, auth) => {
  try {
    const response = await axios.post(
      "https://taskify-qd27.onrender.com/api/collection",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const updateCollection = async (name, collectionId, auth) => {
  try {
    const response = await axios.put(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCollections = async (auth) => {
  try {
    const response = await axios.get(
      "https://taskify-qd27.onrender.com/api/collections",
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getCollection = async (collectionId, auth) => {
  try {
    const response = await axios.get(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteCollection = async (collectionId, auth) => {
  try {
    const response = await axios.delete(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

/** TASK API */

export const createTask = async (name, collectionId, auth) => {
  try {
    const response = await axios.post(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}/task`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getTasks = async (collectionId, auth) => {
  try {
    const response = await axios.get(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (taskId, collectionId, auth) => {
  try {
    const response = await axios.delete(
      `https://taskify-qd27.onrender.com/api/collection/${collectionId}/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
