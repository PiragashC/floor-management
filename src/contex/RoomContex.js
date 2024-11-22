import React, { createContext, useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/utils";

// Create context
export const RoomContext = createContext();

// Create provider
export const RoomProvider = ({ children }) => {
  // Load data from localStorage or set defaults
  const savedData = JSON.parse(localStorage.getItem("roomData")) || {
    rooms: [{ id: 1, name: "Main Room", tables: [] }],
    currentRoom: { id: 1, name: "Main Room", tables: [] },
    selectedTable: null,
  };

  // States
  const [rooms, setRooms] = useState(savedData.rooms);
  const [currentRoom, setCurrentRoom] = useState(savedData.currentRoom);
  const [selectedTable, setSelectedTable] = useState(savedData.selectedTable);

  const handleAddRoom = (name) => {
    if (!name) {
      showErrorToast({ content: "Please choose a name for the room" });
      return;
    }

    // Save the previous current room's data in the rooms array
    const updatedRooms = rooms.map((room) =>
      room.id === currentRoom?.id ? { ...room, ...currentRoom } : room
    );

    // Create the new room
    const newRoom = { id: updatedRooms.length + 1, name, tables: [] };

    // Update the rooms array and set the new current room
    setRooms([...updatedRooms, newRoom]);
    setCurrentRoom(newRoom);

    showSuccessToast({ content: "Room added successfully" });
  };

  console.log(rooms, "fhdgfsf");

  const updateRooms = (roomId, updatedTables) => {
    if (roomId && updatedTables?.length > 0) {
      const updatedRooms = rooms.map((room) =>
        room.id === roomId ? { ...room, tables: updatedTables } : room
      );
      setRooms(updatedRooms);
      showSuccessToast({ content: "Room updated successfully" });
    } else {
      showErrorToast({
        content: "Please provide valid room ID and updated tables",
      });
    }
  };

  const handleTableUpdate = (updatedTable) => {
    if (updatedTable) {
      const updatedTables = currentRoom.tables.map((table) =>
        table.id === updatedTable.id ? updatedTable : table
      );
      setCurrentRoom({ ...currentRoom, tables: updatedTables });
      showSuccessToast({ content: "Table updated successfully" });
      updateRooms(currentRoom.id, updatedTables);
    } else {
      showErrorToast({ content: "Please provide valid updated tables" });
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        currentRoom,
        selectedTable,
        setRooms,
        setCurrentRoom,
        setSelectedTable,
        handleAddRoom,
        updateRooms,
        handleTableUpdate,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
