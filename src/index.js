import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";
import { RoomProvider } from "./contex/RoomContex";
import { ToastContainer } from "react-toastify";
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <RoomProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </RoomProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
