import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, } from "react-router-dom";
import "./ToDoList.css"; // We'll use an external CSS file for styling

const backendUrl = process.env.REACT_APP_BACKENDURL;

const ToDoList = () => {
  const { listitle: customlistname } = useParams();
  const [items, setItems] = useState([]);
  const [Name, setName] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      console.log(`Fetching list of ${customlistname}...`);
      try {
        const response = await axios.get(
          `${backendUrl}/user/${customlistname}`
        );
        console.log("loading webpage: ", response.data);
        setItems(response.data.itemadds);
        setName(response.data.listitle);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };

    fetchList();
  }, [customlistname]);

  const handleDelete = async (checkedItemId, customlistname) => {
    try {
      const response = await axios.post(`${backendUrl}/user/delete`, {
        checkedItemId, // Item ID from the To-Do list
        listName: Name, // Name of the list (same as customlistname)
      });
      console.log(response.data); // Debugging purposes
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddItem = async (e) => {
    if (e.key === "Enter") {
      const addItemText = e.target.value.trim();
      if (!addItemText) return;

      try {
        const response = await axios.post(`${backendUrl}/user/`, {
          additem: addItemText,
          list: Name,
        });
        setItems([...items, response.data.itemadds]);
        e.target.value = ""; // Clear the input field
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">{customlistname.toUpperCase()}</h1>
      <ul className="todo-list">
        {items.map((item) => (
          <li key={item._id} className="todo-item">
            <input
              type="checkbox"
              className="todo-checkbox"
              onClick={() => handleDelete(item._id, customlistname)}
            />
            <span className="todo-text">{item.name}</span>
            <span className="todo-date">
              {new Date(item.updatedAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add item"
        className="todo-input"
        onKeyPress={handleAddItem}
      />
    </div>
  );
};

export default ToDoList;
