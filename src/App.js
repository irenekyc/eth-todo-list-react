import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min";
import Todo from "./abis/TodoList.json";
import _isEmpty from "lodash/isEmpty";
import Header from "./components/header";
import TaskList from "./components/task-list";

const App = () => {
  const [account, setAccount] = useState();
  const [todoContract, setTodoContract] = useState({});
  const [tasks, setTasks] = useState({
    taskCount: 0,
    data: [],
  });
  const [appStatus, setAppStatus] = useState("set");
  useEffect(() => {
    const init = async () => {
      const getWeb3 = async () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          return new Web3(window.ethereum);
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          return new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-ethereum browser detected. Please consider trying MetaMask"
          );
          return null;
        }
      };

      const web3 = await getWeb3();
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const todoData = Todo.networks[networkId];

        if (todoData) {
          const todoInstance = new web3.eth.Contract(
            Todo.abi,
            todoData.address
          );
          setTodoContract(todoInstance);
          const taskCount = await todoInstance.methods.getTaskCount().call();
          let data = [];
          for (var i = 1; i <= taskCount; i++) {
            const task = await todoInstance.methods.tasks(i).call();
            if (!task._hide) {
              data.push({
                task: task._taskName,
                id: task._id,
                isCompleted: task._completed,
              });
            }
          }
          setTasks({ taskCount, data });
        }
      }
    };
    init();
  }, []);

  const addTask = async (newTask) => {
    if (!_isEmpty(todoContract)) {
      setAppStatus("pending");
      // do something

      await todoContract.methods
        .addTask(newTask)
        .send({ from: account })
        .on("confirmation", () => {
          setAppStatus("completed");
        });
    }
  };

  const toggleTaskStatus = async (taskId) => {
    if (!_isEmpty(todoContract)) {
      setAppStatus("pending");
      // do something

      await todoContract.methods
        .toggleTaskStatus(parseInt(taskId))
        .send({ from: account })
        .on("confirmation", () => {
          setAppStatus("completed");
        });
    }
  };

  const hideCompletedTasks = async () => {
    if (!_isEmpty(todoContract)) {
      setAppStatus("pending");
      // do something

      await todoContract.methods
        .hideCompletedTask()
        .send({ from: account })
        .on("confirmation", () => {
          setAppStatus("completed");
        });
    }
  };

  const hideTask = async (taskId) => {
    if (!_isEmpty(todoContract)) {
      setAppStatus("pending");
      // do something

      await todoContract.methods
        .hideTask(parseInt(taskId))
        .send({ from: account })
        .on("confirmation", () => {
          setAppStatus("completed");
        });
    }
  };
  useEffect(() => {
    const updateTask = async () => {
      const taskCount = await todoContract.methods.getTaskCount().call();
      let data = [];
      for (var i = 1; i <= taskCount; i++) {
        const task = await todoContract.methods.tasks(i).call();
        if (!task._hide) {
          data.push({
            task: task._taskName,
            id: task._id,
            isCompleted: task._completed,
          });
        }
      }
      setTasks({ taskCount, data });
    };
    if (appStatus === "completed") {
      updateTask();
    }
  }, [appStatus, todoContract]);

  return (
    <div className="app">
      <Header addTask={addTask} />
      <TaskList
        tasksList={tasks.data}
        toggleTaskStatus={toggleTaskStatus}
        hideCompletedTasks={hideCompletedTasks}
        hideTask={hideTask}
      />
    </div>
  );
};

export default App;
