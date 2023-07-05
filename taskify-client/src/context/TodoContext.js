import axios from "axios";
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const createTodo = async (name) => {
    await axios
      .post("http://localhost:3002/api/todo/create", { name })
      .then((res) => {
        if (res.data) {
          setTodos((prev) => [...prev, res.data]);
        }
      });
  };
  const fetchTodo = async () => {
    await axios.get("http://localhost:3002/api/todo/").then((res) => {
      if (res.data) {
        setTodos((prev) => [...res.data]);
      }
    });
  };
  const value = {
    todos,
    createTodo,
    fetchTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
