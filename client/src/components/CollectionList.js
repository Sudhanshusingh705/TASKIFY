import React from "react";
import { NavLink } from "react-router-dom";
import starIcon from "../assets/star.svg";
const CollectionList = ({ collections }) => {
  return (
    <div className="mt-5">
      <ul>
        {collections &&
          collections.map((collection) => {
            return (
              <li key={collection._id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex gap-5 capitalize w-full py-3 font-semibold text-white/90 bg-blue-800 rounded-lg px-3 mb-3 "
                      : "flex gap-5 capitalize w-full py-3 font-semibold text-white/90  rounded-lg px-3 mb-3"
                  }
                  key={collection._id}
                  to={`collection/${collection._id}`}
                >
                  {" "}
                  {collection.name === "today" ? (
                    <img src={starIcon} alt="Imp" />
                  ) : (
                    ""
                  )}
                  {collection.name}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CollectionList;
