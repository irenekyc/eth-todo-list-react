import React, { useState } from "react";
import "./header.css";
import classnames from "classnames";
import { SunIcon } from "../icons";
import Checkbox from "../checkbox";

const Header = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");

  const checkEnter = (e) => {
    if (newTask === "") return;
    if (e.key === "Enter") {
      setNewTask("");
      addTask(newTask);
    }
  };
  const toggleTheme = () => {};

  return (
    <div className={classnames("header", "header__dark")}>
      <div className="container header__row">
        <h1>TODO</h1>
        <button onClick={toggleTheme}>
          <SunIcon height="20" />
        </button>
      </div>
      <div>
        <div className="container header__taskInput item-styles">
          <button>
            <Checkbox active={false} />
          </button>
          <input
            placeholder="Create a new todo..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyUp={checkEnter}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
