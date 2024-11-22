import React, { useContext } from "react";
import { RoomContext } from "../contex/RoomContex";

const Statistics = () => {
  const { currentRoom } = useContext(RoomContext);
  const totalTables = currentRoom.tables.length;
  const totalMinCovers = currentRoom.tables.reduce(
    (sum, t) => sum + (t.minCovers || 0),
    0
  );
  const totalMaxCovers = currentRoom.tables.reduce(
    (sum, t) => sum + (t.maxCovers || 0),
    0
  );
  const totalOnlineCapacity = currentRoom.tables.reduce(
    (sum, t) => sum + (t.online || 0),
    0
  );

  return (
    <div className="statics_area">
      <div className="table_statics_grp">
        <i className="bi bi-bounding-box"></i>
        <h6>{totalTables} Tables</h6>
      </div>
      <div className="table_statics_grp">
        <i className="bi bi-people-fill"></i>
        <h6>{totalMinCovers} Min Covers</h6>
      </div>
      <div className="table_statics_grp">
        <i className="bi bi-people-fill"></i>
        <h6>{totalMaxCovers} Max Covers</h6>
      </div>
      <div className="table_statics_grp">
        <i className="bi bi-globe"></i>
        <h6>{totalOnlineCapacity} Online Capacity</h6>
      </div>
    </div>
  );
};

export default Statistics;
