import React from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/actions/noteAction';
import { sendConstNote, sendConstTitle, resetingInputAI } from '../App';

let constTitle = "null";
let constContent = "null";
let type = 2;

function AddTodoForm() {
  const dispatch = useDispatch();
  const checkbox = document.getElementById("checkbox");
  let title;
  let content;

  const handleClick = () => {

    title = document.getElementById("todo");
    constTitle = title.value;
    type=2;
    dispatch(addNote({
      constTitle,
      constContent,
      type
    }));
    title.value = '';
  }

  return (
    <div className="p-2 w-full" bis_skin_checked="1">
      <button onClick={handleClick} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
    </div>
  );
}

export default AddTodoForm;