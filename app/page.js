"use client";
import React, { useState } from "react";


const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // If editIndex is not null, update the existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title: updatedTitle, desc: updatedDesc };
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      // If editIndex is null, add a new task
      setMainTask([...mainTask, { title, desc }]);
    }

    // Clear input fields
    setTitle("");
    setDesc("");
    setUpdatedTitle("");
    setUpdatedDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    // Set editIndex and populate the input fields with the current task values
    setEditIndex(i);
    setUpdatedTitle(mainTask[i].title);
    setUpdatedDesc(mainTask[i].desc);
  };

  let renderTask = <h2>No task available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex justify-between items-center">
          {editIndex === i ? (
            // Render input fields and "Update" button when editing
            <div className="flex items-center justify-between w-1/2">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="text-xl border-zinc-600 border-2 m-8 px-4 py-2"
              />
              <input
                type="text"
                value={updatedDesc}
                onChange={(e) => setUpdatedDesc(e.target.value)}
                className="text-xl border-zinc-600 border-2 m-8 px-4 py-2"
              />
              <button
                onClick={submitHandler}
                className="bg-green-400 text-white px-4 py-2 rounded font-bold"
              >
                Update
              </button>
            </div>
          ) : (
            // Render task details and "Edit" and "Delete" buttons
            <>
              <div className="items-center justify-between w-1/2">
                <h5 className="text-2xl font-semibold">Task: {t.title}</h5> 
                <h6 className="text-2xl font-semibold">Desc: {t.desc} </h6>
              </div>
              <div >
                <button
                  onClick={() => editHandler(i)}
                  className="bg-blue-400 text-white px-4 py-2 m-3 rounded font-bold mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="bg-red-400 text-white px-4 py-2 rounded font-bold"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      );
    });
  }

return (
  <>
    <h1 className="bg-slate-500 text-white p-5 text-5xl font-bold text-center">
      My Task Manager
    </h1>
    <div className="todo bg-gray-100 p-8">
      <form onSubmit={submitHandler} className="mb-8">
        <input
          type="text"
          name="task"
          placeholder="Add Task"
          className="text-lg border-gray-300 border-2 m-2 px-4 py-2 rounded"
          value={editIndex !== null ? updatedTitle : title}
          onChange={(e) => {
            editIndex !== null ? setUpdatedTitle(e.target.value) : setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          name="description"
          placeholder="Add Description"
          className="text-lg border-gray-300 border-2 m-2 px-4 py-2 rounded"
          value={editIndex !== null ? updatedDesc : desc}
          onChange={(e) => {
            editIndex !== null ? setUpdatedDesc(e.target.value) : setDesc(e.target.value);
          }}
        />
        <button className="bg-slate-500 text-white px-4 py-2 rounded text-lg font-bold ml-2">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div>
        <ul>{renderTask}</ul>
      </div>
    </div>
  </>
);
};

export default Page;

