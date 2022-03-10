import React from "react";

import "./itemrow.css";
import Checkbox from "../checkbox";
import { CloseIcon } from "../icons";
import classnames from "classnames";

const ItemRow = ({
  isCompleted,
  content,
  taskId,
  toggleTaskStatus,
  hideTask,
  ...props
}) => {
  const onClickDeleteTask = () => {
    hideTask(taskId);
  };

  const onClickCheckbox = () => {
    toggleTaskStatus(taskId);
  };
  return (
    <div
      className={classnames("item-styles", "item-row", "item-row__dark")}
      {...props}
    >
      <button onClick={onClickCheckbox}>
        <Checkbox active={isCompleted} />
      </button>
      <span
        className={classnames({
          "item-cross": isCompleted,
        })}
      >
        {content}
      </span>
      <button className={"item-row__deleteButton"} onClick={onClickDeleteTask}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ItemRow;
