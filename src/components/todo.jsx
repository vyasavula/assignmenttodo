import React, { useState, useEffect } from "react";
import todo from "../images/todo.svg";

//To fetch the stored data in the Local Storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  //   Add Items to Array
  const addItem = () => {
    if (!inputData) {
      alert("The Task box cannot be empty");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  //Deleting Items from an Array
  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };
  //EDit items
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  //Reset All
  const removeAll = () => {
    setItems([]);
  };

  //Adding Data to Local Storage.
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  //Sarching through the "#"
  //   const searchTag = () => {};
  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <h1 className="listHeading">To-do list</h1>
          <figure>
            <img src={todo} alt="logotodo"></img>
            <figcaption>What are you planning to do today?🔥</figcaption>
          </figure>
          {/* Adding Tasks */}
          <div className="addItems">
            <input
              type="text"
              value={inputData}
              placeholder="Write here to Add...."
              onChange={(e) => setInputData(e.target.value)}
            ></input>
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add your task"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update task"
                onClick={addItem}
              ></i>
            )}

            {/* Showing the tasks */}
            <div className="showItems">
              {items.map((elem) => {
                return (
                  <div className="eachItem" key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className="todo-btn">
                      {/* Edit  */}
                      <i
                        className="far fa-edit add-btn"
                        title="Edit task"
                        onClick={() => editItem(elem.id)}
                      ></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        title="Delete task"
                        onClick={() => deleteItem(elem.id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Clear all Button */}
            <div className="showItems">
              <button
                className="btn effect04"
                data-sm-link-text="Clear All"
                onClick={removeAll}
              >
                <span>CHECK LIST</span>
              </button>
              {/* Searching through the Hashtags. */}

              {/* {items.map((elem) => {
                return (
                  <div className="search-bar">
                    <input
                      type="text"
                      className="input-search"
                      placeholder="Search with #"
                    />
                  </div>
                );
              })} */}
              {/* <div className="search-bar">
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search with #"
                />
                <button className="btn-search">
                  <i className="fas fa-search"></i>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
