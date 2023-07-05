import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  createTask,
  deleteCollection,
  deleteTask,
  getCollection,
  getCollections,
  getTasks,
  updateCollection,
} from "../utils/api";

import bookIcon from "../assets/book.svg";
import circleIcon from "../assets/circle.svg";
import deleteIcon from "../assets/trash-2.svg";
import editIcon from "../assets/edit.svg";
import xIcon from "../assets/x.svg";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const { auth } = useAuth();
  const [tasks, setTasks] = useState();
  const [editCollectionName, setEditCollectionName] = useState();
  const [setCollections, collections] = useOutletContext();
  const [toggleCollectionEdit, setToggleCollectionEdit] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const [taskName, setTaskName] = useState();

  function handledeleteCollection() {
    deleteCollection(collectionId, auth).then((collection) => {
      setCollections(
        collections.filter((item) => item._id !== collection.data._id)
      );
    });
  }

  /**
   * UseEffect
   * * To fetch tasks,
   */

  useEffect(() => {
    getTasks(collectionId, auth).then((tasks) => {
      console.log(tasks.data);
      setTasks(tasks.data);
    });
    getCollection(collectionId, auth).then((collection) => {
      console.log(collection.data[0].name);
      setCollectionName(collection.data[0].name);
    });
  }, [auth, collectionId]);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, collectionId, auth).then((task) => {
      setTasks(tasks.filter((item) => item._id !== task.data._id));
    });
  };

  const handleCollectionEditSubmit = (e) => {
    e.preventDefault();
    updateCollection(editCollectionName, collectionId, auth).then(
      (collection) => {
        setCollectionName(collection.data.name);
        setToggleCollectionEdit(false);
        getCollections(auth).then((collections) =>
          setCollections(collections.data)
        );
      }
    );
  };

  return (
    <div className=" flex-1 px-10   relative flex flex-col items-center">
      {toggleCollectionEdit ? (
        <div className="mt-5 rounded-lg p-4 text-3xl capitalize w-full font-bold flex items-center justify-between bg-orange-200">
          <div className="flex items-center ">
            {" "}
            <img className=" pr-3" src={bookIcon} alt="" />
            <form onSubmit={handleCollectionEditSubmit}>
              <input
                autoFocus
                className="bg-transparent outline-none"
                type="text"
                value={editCollectionName}
                onChange={(e) =>
                  setEditCollectionName(e.target.value.trimStart())
                }
              />
            </form>
          </div>
          <div className="flex gap-5">
            <img
              className="cursor-pointer"
              onClick={(e) => setToggleCollectionEdit(false)}
              src={xIcon}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 text-3xl capitalize w-full font-bold flex items-center justify-between">
          <div className="flex items-center ">
            {" "}
            <img className=" pr-3" src={bookIcon} alt="" />
            <span>{collectionName}</span>
          </div>
          <div className="flex gap-5">
            <img
              className="cursor-pointer"
              onClick={(e) => {
                setToggleCollectionEdit(true);
                setEditCollectionName(collectionName);
              }}
              src={editIcon}
              alt=""
            />

            <img
              className="cursor-pointer"
              src={deleteIcon}
              onClick={handledeleteCollection}
              alt=""
            />
          </div>
        </div>
      )}

      <div className="mt-5 mb-28 py-5 px-8 bg-white rounded-lg shadow-lg overflow-y-auto  w-full">
        <div>
          <ul className="flex flex-col gap-5">
            {tasks &&
              tasks.map((task) => {
                return (
                  <li key={task._id} className="flex justify-between gap-5">
                    <div className="flex items-center">
                      <img src={circleIcon} alt="" />
                      <span className="text-lg font-medium pl-2 ">
                        {task.name}
                      </span>
                    </div>
                    <img
                      onClick={() => handleDeleteTask(task._id)}
                      className="cursor-pointer"
                      src={deleteIcon}
                      alt=""
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className=" absolute bottom-9 px-20 w-full  ">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setTaskName("");
            createTask(taskName, collectionId, auth).then((task) => {
              setTasks([...tasks, task.data]);
            });
          }}
        >
          <input
            name="Task"
            type="text"
            value={taskName}
            className="w-full py-3 text-white/90 bg-[#2a2731] rounded-lg px-3 focus:outline-none focus:ring  placeholder:text-white/70 placeholder:font-medium"
            placeholder="Add Task"
            onChange={(e) => setTaskName(e.target.value.trimStart())}
          />
        </form>
      </div>
    </div>
  );
};

export default CollectionPage;
