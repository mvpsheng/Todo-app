import "./App.css";
import bgdark from "./assets/images/bg-desktop-dark.jpg";
import Todo from "./components/Todo";

import React, { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState("light");

  const [formData, setFormData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [todolist, setTodolist] = useState([
    {
      name: "start a potato",
      complete: true,
    },
    {
      name: "learn germany in half a hour",
      complete: true,
    },
    {
      name: "learn advanced english vocabulary",
      complete: false,
    },
  ]);

  const [filteredTodos, setFilteredTodos] = useState(todolist);
  const [showAll, setShowAll] = useState(true);
  function showAllTodos() {
    setFilteredTodos(todolist);
    setShowAll(true);
  }
  function filterTodos(isFinished) {
    const filtered = todolist.filter((todo) => todo.complete === isFinished);
    setFilteredTodos(filtered);
  }
  function handleComplete(index) {
    todolist[index].complete = !todolist[index].complete;
  }
  const [unfinishedTodoCount, setUnfinishedTodoCount] = useState(0);

  const updateTodos = (newTodos) => {
    const unfinishedTodos = todolist.filter((todo) => !todo.complete);
    if (newTodos) {
      setTodolist(newTodos);
      unfinishedTodos = newTodos.filter((todo) => !todo.complete);
    }
    setUnfinishedTodoCount(unfinishedTodos.length);
  };

  useEffect(() => {
    updateTodos();
  }, []);
  function createatodo(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const newtodo = { name: event.target.value, complete: isChecked };
      setTodolist([...todolist, newtodo]);
      setFilteredTodos([...todolist, newtodo]);
      event.target.value = ""; // Clear the input field
      setFormData("");
    }
  }

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  function deleteCompletedTodos() {
    const remainingTodos = todolist.filter((todo) => !todo.complete);
    setTodolist(remainingTodos);
    setFilteredTodos(remainingTodos);
  }
  return (
    <div className={`app ${theme}`}>
      {/* <img src={bgdark} alt="background image dark" /> */}
      <div className="header">
        <p>T O D O</p>
        <button onClick={handleThemeToggle}></button>
      </div>
      <form className="createnew">
        <input
          type="checkbox"
          className="circle-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p>Create a new todo...</p>
        <input
          type="text"
          className="createtodo"
          onKeyDown={createatodo}
          value={formData}
          onChange={(event) => setFormData(event.target.value)}
        />
      </form>
      <div className="todolist">
        {filteredTodos.map((todo, index) => (
          <Todo
            key={index}
            name={todo.name}
            toggleComplete={() => handleComplete(index)}
            complete={todo.complete}
          ></Todo>
        ))}
        <div className="listfunctions">
          <div>
            <p>
              <span>{todolist.length}</span>items left
            </p>
          </div>
          <div className="listselector">
            <img src="" alt="" />
            <button onClick={showAllTodos}>All</button>
            <button onClick={() => filterTodos(false)}>Active</button>
            <button onClick={() => filterTodos(true)}>Completed</button>
          </div>
          <div>
            <button onClick={deleteCompletedTodos}>Clear Completed list</button>
          </div>
        </div>
      </div>
      <div>Drag and drop to reorder</div>
    </div>
  );
}
