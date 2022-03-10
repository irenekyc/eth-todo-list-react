import React, { useState, useEffect } from "react";
import classnames from "classnames";
import "./tasklist.css";
import ItemRow from "../item-row/ItemRow";

const FILTER_ALL = "All";
const FILTER_ACTIVE = "Active";
const FILTER_COMPLETED = "Completed";
const FITLER_LIST = [FILTER_ALL, FILTER_ACTIVE, "Completed"];

const TaskList = ({
  tasksList,
  toggleTaskStatus,
  hideCompletedTasks,
  hideTask,
}) => {
  const [currentFilter, setCurrentFilter] = useState(FILTER_ALL);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [taskData, setTaskData] = useState({
    active: 0,
    completed: 0,
  });
  const [tasks, setTasks] = useState(tasksList);

  useEffect(() => {
    if (currentFilter === FILTER_ALL) {
      setTasks(tasksList);
    } else if (currentFilter === FILTER_ACTIVE) {
      setTasks(tasksList.filter((task) => !task.isCompleted));
    } else if (currentFilter === FILTER_COMPLETED) {
      setTasks(tasksList.filter((task) => task.isCompleted));
    }
  }, [currentFilter, tasksList]);

  useEffect(() => {
    if (tasksList.length === 0) return;
    setTasks(tasksList);
    const activeNumber = tasksList.filter((task) => !task.isCompleted).length;
    const completedNumber = tasksList.filter((task) => task.isCompleted).length;
    setTaskData({
      active: activeNumber,
      completed: completedNumber,
    });
    setShowFilterRow(activeNumber !== 0 && completedNumber !== 0);
  }, [tasksList]);

  const onClickClearCompleted = () => {
    hideCompletedTasks();
  };

  if (tasksList.length === 0 || tasks.length === 0) return null;

  return (
    <div className={classnames("task-list task-list__dark")}>
      <div className="container">
        <div className="task-list__ul-list">
          {tasks.map((task) => (
            <ItemRow
              key={task.id}
              isCompleted={task.isCompleted}
              content={task.task}
              taskId={task.id}
              toggleTaskStatus={toggleTaskStatus}
              hideTask={hideTask}
            />
          ))}
        </div>

        <div className={"task-list__settingsRow"}>
          <span>{taskData.active} items left</span>
          {showFilterRow && (
            <div className={"task-list__settingsRow__inlineFilter"}>
              <div className={"task-list__filterRow"}>
                {FITLER_LIST.map((filter) => (
                  <button
                    key={filter}
                    className={classnames("task-list__filterRow__button", {
                      "task-list__filterRow__button__active":
                        currentFilter === filter,
                    })}
                    onClick={() => setCurrentFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {taskData.completed > 0 && (
            <button onClick={onClickClearCompleted}>Clear Completed</button>
          )}
        </div>
      </div>
      {/* {showFilterRow && (
        <div className={styles.taskList__settingsRow__outlineFilter}>
          <div className={styles.filterRow}>
            <div className={styles.filterRow__wrapper}>
              {FITLER_LIST.map((filter) => (
                <button
                  key={filter}
                  className={classnames(styles.filterRow__button, {
                    [styles.filterRow__button__active]:
                      currentFilter === filter,
                  })}
                  onClick={() => setCurrentFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TaskList;
