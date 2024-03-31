import React from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/actions/noteAction';
import { sendConstNote,sendConstTitle,resetingInputAI } from '../App';

let constTitle = "";
let constContent = "";
let constNote = "";
let type=1;

function AddNoteForm() {
  const dispatch = useDispatch();
  let title;
  let content;
  
  const handleClick = () => {
    const aiBtn = document.querySelector(".genrate_ai");
    if (aiBtn.style.display === "none") {
      constTitle= sendConstTitle();
      constNote = sendConstNote();
      title = document.querySelector("#name");
      constContent = constNote;
      
    }
    else {
      title = document.querySelector("#name");
      content = document.querySelector("#message");
      if (title === "" || content === "") {
        return;
      }
      constTitle = title.value;
      constContent = content.value;
      
    }
    const preview = document.querySelector(".note_preview");
    dispatch(addNote({ constTitle, constContent,type }));
    title.value = "";
    resetingInputAI();
  }

  return (
    <div className="w-full flex" bis_skin_checked="1">
      <button onClick={handleClick} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
    </div>
  );
}

export default AddNoteForm;