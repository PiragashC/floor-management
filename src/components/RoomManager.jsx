import React, { useContext, useState } from "react";
import { RoomContext } from "../contex/RoomContex";
import { showSuccessToast } from "../utils/utils";

const RoomManager = () => {
  const { rooms, currentRoom, setCurrentRoom, handleAddRoom, selectedTable } =
    useContext(RoomContext);
  const [newRoomName, setNewRoomName] = useState("");

  const handleAdd = () => {
    handleAddRoom(newRoomName);
    setNewRoomName("");
  };

  const saveRoom = () => {
    const stateToSave = {
      rooms,
      currentRoom,
      selectedTable,
    };

    localStorage.setItem("roomData", JSON.stringify(stateToSave));
    showSuccessToast({ content: "Room data saved successfully!" });
  };

  return (
    <div className="tab_nav nav_bar">
      <div className="table_tabs">
        {rooms.map((room) => (
          <>
            <h5
              key={room.id}
              className={`tab_head custom is_tab ${
                room.id === currentRoom.id ? "active" : ""
              }`}
              onClick={() => setCurrentRoom(room)}
            >
              {room.name}
            </h5>
          </>
        ))}
      </div>

      <div className="add_data_area">
        <div className="input_group">
          <>
            <input
              type="text"
              placeholder="Enter new room"
              className="custom_input"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <button type="button" className="add_btn" onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i>
              Add Room
            </button>
          </>

          <>
            <button type="button" className="save_btn" onClick={saveRoom}>
              Save Room
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default RoomManager;
