import React, { useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../index.css";
import table1 from "../images/Table.svg";
import table2 from "../images/Mid.svg";
import duplicate from "../images/copy.svg";
import trash from "../images/trash.svg";
import rotate from "../images/Ellipse 5132.svg";
import { RoomContext } from "../contex/RoomContex";
import TableDetails from "./TableDetails";
import RoomManager from "./RoomManager";
import Statistics from "./Statistics";

const Layout = () => {
  const {
    currentRoom,
    setCurrentRoom,
    setSelectedTable,
    rooms,
    setRooms,
    selectedTable,
  } = useContext(RoomContext);

  const handleUpdateRoom = (updatedTables) => {
    const updatedRooms = rooms.map((room) =>
      room.id === currentRoom?.id ? { ...room, tables: updatedTables } : room
    );
    setRooms(updatedRooms);
    setCurrentRoom({ ...currentRoom, tables: updatedTables });
  };

  const DraggableTableImage = ({ src, tableType }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "NEW_TABLE",
      item: { type: "NEW_TABLE", tableType },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <img
        ref={drag}
        src={src}
        alt={tableType}
        style={{
          width: "100px",
          height: "100px",
          margin: "0 10px",
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
        }}
      />
    );
  };

  const [, drop] = useDrop({
    accept: ["NEW_TABLE", "TABLE"],
    drop: (item, monitor) => {
      const { x, y } = monitor.getClientOffset();
      const floorPlanRect = document
        .querySelector(".workspace")
        .getBoundingClientRect();
      const adjustedX = x - floorPlanRect.left;
      const adjustedY = y - floorPlanRect.top;

      if (item.type === "NEW_TABLE") {
        const newTable = {
          id: Date.now(),
          name: `Table ${currentRoom.tables.length + 1}`,
          x: adjustedX,
          y: adjustedY,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0, // Added rotation
          tableType: item.tableType,
          online: true,
        };
        handleUpdateRoom([...currentRoom.tables, newTable]);
      } else if (item.type === "TABLE") {
        const updatedTables = currentRoom.tables.map((table) =>
          table.id === item.id
            ? { ...table, x: adjustedX, y: adjustedY }
            : table
        );
        handleUpdateRoom(updatedTables);
      }
    },
  });

  const Table = ({
    table,
    onUpdateRoom,
    currentTables,
    onSelectTable,
    selectedTable,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [{ isDragging }, drag] = useDrag({
      type: "TABLE",
      item: { ...table, type: "TABLE" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const handleDelete = () => {
      const updatedTables = currentTables.filter((t) => t.id !== table.id);
      onUpdateRoom(updatedTables);
    };

    const handleDuplicate = () => {
      const duplicateTable = {
        ...table,
        id: Date.now(),
        x: table.x + 20, // Slight offset to avoid overlap
        y: table.y + 20,
      };
      onUpdateRoom([...currentTables, duplicateTable]);
    };

    const handleRotate = () => {
      const updatedTables = currentTables.map((t) =>
        t.id === table.id
          ? { ...t, rotation: (t.rotation + 90) % 360 } // Rotate by 90 degrees
          : t
      );
      onUpdateRoom(updatedTables);
    };

    const isSelected = selectedTable?.id === table.id;

    return (
      <div
        ref={drag}
        style={{
          top: table.y,
          left: table.x,
          position: "absolute",
          cursor: "grab",
          opacity: isDragging ? 0.5 : 1,
          border: isSelected ? "2px solid brown" : "none",
          boxShadow: isSelected ? "0px 0px 10px rgba(0, 0, 255, 0.5)" : "none",
          borderRadius: "5px",
        }}
      >
        {/* Hoverable Container */}
        <div
          style={{
            position: "relative",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Rotating the Table Image */}
          <div
            style={{
              transform: `rotate(${table.rotation}deg)`,
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src={table.tableType === "type1" ? table1 : table2}
              alt={table.name}
              style={{
                width: "100px",
                height: "100px",
              }}
              onClick={() => onSelectTable(table)}
            />
          </div>

          {/* Hover Menu - Prevent Rotation */}
          {isHovered && (
            <div
              style={{
                position: "absolute",
                top: "-30px",
                left: "0",
                display: "flex",
                gap: "5px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                transform: "none", // Prevent rotation
              }}
            >
              {/* <img
                src={rotate}
                alt="Rotate"
                onClick={handleRotate}
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              /> */}
              <i
                class="bi bi-arrow-counterclockwise"
                onClick={handleRotate}
                style={{ cursor: "pointer" }}
              ></i>
              {/* <img
                src={duplicate}
                alt="Duplicate"
                onClick={handleDuplicate}
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              /> */}
              <i
                class="bi bi-copy"
                onClick={handleDuplicate}
                style={{ cursor: "pointer" }}
              ></i>
              {/* <img
                src={trash}
                alt="Delete"
                onClick={handleDelete}
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
              /> */}
              <i
                class="bi bi-trash"
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="title_bar">
        <h5>Floor Management</h5>
      </div>

      <div className="main_layout">
        <div className="side_bar">
          <div className="tab_nav">
            <h5 className="tab_head">Tables</h5>
          </div>

          <div className="side_bar_body">
            <div className="sidebar_options_body">
              <h6 className="heading">Table Options</h6>
              <p className="sub_heading">Drag ans drop your tables</p>

              {/* Drag */}
              <div className="option_area">
                <DraggableTableImage src={table1} tableType="type1" />
                <DraggableTableImage src={table2} tableType="type2" />
              </div>
            </div>

            <TableDetails />
          </div>
        </div>

        <div className="workspace_area">
          <RoomManager />
          <div className="workspace_body">
            {/* Drop */}
            <div className="workspace" ref={drop}>
              {currentRoom.tables.map((table) => (
                <Table
                  key={table.id}
                  table={table}
                  onUpdateRoom={handleUpdateRoom}
                  currentTables={currentRoom.tables}
                  onSelectTable={setSelectedTable}
                  selectedTable={selectedTable}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Statistics />
    </section>
  );
};

export default Layout;
