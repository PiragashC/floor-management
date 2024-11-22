# floor-management
This project is a Floor management application with drag and drop functionality. 

## Prerequisites

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)

## Frontend

The frontend is a React application located in the `floor-management` directory.

### Installation

1. Navigate to the `floor-management` directory:

    ```bash
    cd pdf-viewer
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Frontend

To start the frontend application, run:

    ```bash
    npm start
    ```

This will launch the development server and open the application in your default web browser.

This project uses React and several essential libraries to create a dynamic, user-friendly web application. Below is a summary of the libraries used and their purposes.

## Libraries Used

### 1. React and React DOM
- **react**: The core library for building user interfaces.
- **react-dom**: Integrates React with the browser DOM.

### 2. React Scripts
- Provides a pre-configured setup for building React applications without manual configuration.

### 3. @testing-library
- **@testing-library/react**: Simplifies testing of React components.
- **@testing-library/jest-dom**: Adds custom matchers for DOM testing with Jest.
- **@testing-library/user-event**: Simulates user interactions for better test coverage.

### 4. React Hook Form
- A lightweight library for managing forms, including state, validation, and submission.

### 5. React Toastify
- For displaying beautiful, customizable toast notifications.

### 6. React DnD
- **react-dnd**: Enables drag-and-drop functionality.
- **react-dnd-html5-backend**: The default backend for React DnD, using the HTML5 drag-and-drop API.

### 7. Bootstrap Icons
- A comprehensive set of scalable vector icons for UI design.

### 8. Web Vitals
- Measures performance metrics like loading speed and responsiveness to improve user experience.

---

## Installation

To install dependencies, run:

```bash
npm install


## Drag-and-Drop Functionality

This project implements a precise drag-and-drop mechanism using the **React DnD** library. The functionality allows users to drag table images and drop them onto a workspace with accurate positioning.

## Key Concepts

1. **React DnD**:  
   - Used to handle drag-and-drop interactions in React applications.
   - Provides two main hooks:
     - `useDrag` for making elements draggable.
     - `useDrop` for defining drop zones.

2. **Precise Positioning**:  
   - The drop zone calculates the exact coordinates of the dropped element relative to the workspace using the browser's DOM API.

---

## Core Functionality

### Draggable Table Image

This component makes table images draggable using the `useDrag` hook.

The monitor.getClientOffset() method retrieves the mouse position during the drop.
The workspace's bounding rectangle (getBoundingClientRect()) is used to calculate the exact position relative to the drop zone.