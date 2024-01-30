import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import donatello from "../assets/donatello.png";
import { createCollection, getCollections, getUser } from "../utils/api";

import CollectionList from "../components/CollectionList";

const DashBoard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState([]);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    getUser(auth).then((user) => setUser(user.data));
    getCollections(auth).then((collections) =>
      setCollections(collections.data)
    );
  }, [auth]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setAuth({});
  };
  const handleCollectionSubmit = async (event) => {
    event.preventDefault();
    await createCollection(collectionName, auth);
    setCollectionName("");

    getCollections(auth).then((collections) =>
      setCollections(collections.data)
    );
  };

  return (
    <div className="container mx-auto max-w-screen-xl bg-[#fafafa] flex h-screen ">
      <div className="h-full w-[300px] sticky top-0 bottom-0 left-0 bg-black px-5 py-3 flex flex-col">
        {/*----- User Profile----- */}
        <div className="w-full">
          <div className="flex items-center mx-auto justify-evenly align-middle  mt-5">
            <img
              className="w-[70px] h-[70px] border-4 border-yellow-300 rounded-full p-2"
              src={donatello}
              alt=""
            />
            <div>
              <p className="font-semibold mb-[2px] text-white/90">
                {user.name}
              </p>{" "}
              <button
                className="text-red-400 text-sm font-semibold"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </div>

          {/* ----- Add Collection ------ */}
          <form onSubmit={handleCollectionSubmit} className="mt-5">
            <input
              name="collection"
              type="text"
              value={collectionName}
              className="w-full py-3 text-white/90 bg-[#2a2731] rounded-lg px-3 focus:outline-none focus:ring  placeholder:text-white/70 placeholder:font-medium"
              placeholder="Add Collection"
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </form>

          {/* List Collection */}
          <div className="bg-white/25 mt-5 pt-[1px] w-full"></div>
          <CollectionList collections={collections} />
        </div>
      </div>

      <Outlet context={[setCollections, collections]} />
    </div>
  );
};

export default DashBoard;
