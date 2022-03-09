const TodoList = artifacts.require("../contracts/TodoList.sol");

contract("TodoList", (accounts) => {
  let TodoListInstance;
  before(async () => {
    TodoListInstance = await TodoList.deployed();
  });
  it("Should return task count of 1 and a task should be created when contract is initialed", async () => {
    const taskCount = await TodoListInstance.getTaskCount();
    assert.equal(taskCount, 1);
    const task = await TodoListInstance.tasks(1);
    assert.equal(task._taskName, "Explore this app");
    assert.equal(task._completed, false);
  });

  it("Add a new task and task count should go up to 2 and correctly stored in tasks", async () => {
    const newTaskName = "task 1";
    await TodoListInstance.addTask(newTaskName);
    const taskCount = await TodoListInstance.getTaskCount();
    assert.equal(taskCount, 2);

    const task = await TodoListInstance.tasks(2);
    assert.equal(task._taskName, newTaskName);
    assert.equal(task._completed, false);
  });

  it("Toggle task status", async () => {
    const taskCount = await TodoListInstance.getTaskCount();

    // toggle to true
    await TodoListInstance.toggleTaskStatus(taskCount);
    const task = await TodoListInstance.tasks(taskCount);
    assert.equal(task._completed, true);

    // toggle again to false
    await TodoListInstance.toggleTaskStatus(taskCount);
    const updatedTask = await TodoListInstance.tasks(taskCount);
    assert.equal(updatedTask._completed, false);
  });
});
