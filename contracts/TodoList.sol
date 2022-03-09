// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract TodoList{
  uint public taskCount = 0;

  mapping (uint => Task) public tasks;

  struct Task {
    uint _id;
    string _taskName;
    bool _completed;
  }

  event TaskCreated (
    uint _id,
    string _taskName,
    bool _completed
  );

  event TaskCompleted (
    uint _id,
    string _taskName,
    bool _completed
  );

  constructor() public {
    addTask("Explore this app");
  }
  
  function getTaskCount() public view returns(uint){
    return taskCount;
  }
  
  function addTask(string memory _taskName) public {
    taskCount++;
    uint taskId = taskCount;
    Task memory task = Task(taskId, _taskName, false);
    tasks[taskId] = task;
    emit TaskCreated(taskId, _taskName, false);
  }

  function toggleTaskStatus(uint _taskId) public {
    bool currentStatus = tasks[_taskId]._completed;
    bool updatedStatus = !currentStatus;
    tasks[_taskId]._completed = updatedStatus;
    emit TaskCompleted(_taskId, tasks[_taskId]._taskName, updatedStatus);
  }
}