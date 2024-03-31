import logo from './logo.svg';
import './App.css';
import new_notes from './Components/templets.js';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from './store/actions/noteAction';
import AddNoteForm from './Components/AddNote.js';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Note from './Components/notes/Note.js';
import AddTodoForm from './Components/AddTodo.js';



let constTitle = "";
let constContent = "";
let constNote = "";

export const sendConstNote = () => {
  return constNote;
}
export const sendConstTitle = () => {
  return constTitle;
}


const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCw5OjvO_BLKZ0ahpHRblKSqV_Z6kYCxGM";

async function run() {
  const overlay_container = document.querySelector(".spinner-container");
  const title = document.querySelector("#name").value;
  const content = document.querySelector("#message").value;
  if (content === "" || title === "") {
    return;
  }
  // overlay_container.classList.add("loading-spinner");
  const preview = document.querySelector(".note_preview");
  constTitle = title;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.55,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  let parts = [
    { text: "\n\nFrom the above information analyse and organise the information into notes or todo list with timeslots .\nUse different font size and weights.\nreturn thius info in HTML tags designed with tailwind css\n" },
  ];
  parts[0]['text'] = content + parts[0]['text'];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  // overlay_container.classList.remove("loading-spinner");

  const response = result.response;
  constNote = response.text().replace('```', '').replace('html', '');
  const aiBtn = document.querySelector(".genrate_ai");
  const resetBtn = document.querySelector(".reset_ai");
  aiBtn.style.display = "none";
  resetBtn.style.display = "block";
  preview.innerHTML = '<div display: flex; flex-wrap: wrap;">' + response.text().replace('```', '').replace('html', '') + '</div>';
}





export async function resetingInputAI() {
  const input = `
<div class="p-2 w-full" bis_skin_checked="1">
                    <div class="flex" bis_skin_checked="1">
                      <label for="name" class="leading-9 text-xl text-gray-600 mx-4">Title: </label>
                      <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div class="p-2 w-full" bis_skin_checked="1">
                    <div class="flex" bis_skin_checked="1">
                      <label for="message" class="leading-9 text-xl text-gray-600 mx-4">Content:</label>
                      <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                  </div>
                  <div className="spinner-container"></div>
`;
  const aiBtn = document.querySelector(".genrate_ai");
  const resetBtn = document.querySelector(".reset_ai");
  const preview = document.querySelector(".note_preview");
  aiBtn.style.display = "block";
  resetBtn.style.display = "none";
  preview.innerHTML = input;
};

// async function AddNote() {
//   const title = document.querySelector("#name");
//   const aiBtn = document.querySelector(".genrate_ai");
//   const dispatch = useDispatch();
//   const content = document.querySelector("#message");
//   if (aiBtn.style.display === "none") {
//     if (constTitle === "" || constContent === "") {
//       return;
//     }
//     title.value = constTitle;
//     content.value = constNote;
//   }
//   else {
//     if (title === "" || content === "") {
//       return;
//     }
//     constTitle = title.value;
//     constContent = content.value;
//   }
//   const preview = document.querySelector(".note_preview");
//   resetingInputAI();
//   dispatch(addNote({ constTitle, constContent }));
//   title.value = "";
//   content.value = "";
// }



function App() {
  const [loading, setLoading] = useState(false); // State variable to track loading
  const [isChecked, setIsChecked] = useState(false);
  let todoEmail = "";
  let todoContent = "";
  let timeDate = "";



  const handleCheckboxChange = () => {

    setIsChecked(!isChecked); // Toggle the isChecked state
    if (isChecked) {
      document.querySelector(".remainder-container").style.display = "none";
    }
    else {
      document.querySelector(".remainder-container").style.display = "block";
    }
  };

  const handleClickAi = async () => {
    setLoading(true); // Set loading to true when AI button is clicked

    try {
      await run(); // Call the run() function when the button is clicked
    } catch (error) {
      console.error('Error occurred during AI processing:', error);
    } finally {
      setLoading(false);

      // overlay_container.classList.remove("loading-overlay"); // Set loading to false when AI process completes or encounters an error
    }
  };


  const handleClickReset = () => {
    resetingInputAI(); // Call the run() function when the button is clicked
  };
  // const handleAddNote = () => {
  //   AddNote(); // Call the run() function when the button is clicked
  // };
  useFirestoreConnect([{ collection: 'notes', where: ['type', '==', 1], orderBy: ['createdAt', 'desc'] }]);
  const notes = useSelector(state => state.firestore.ordered.notes);
  useFirestoreConnect([{ collection: 'notes', where: ['type', '==', 2], orderBy: ['createdAt', 'desc'] }]);
  const todo = useSelector(state => state.firestore.ordered.notes);

  return (
    <div className="App">
      <header className="text-gray-600 body-font border-b-2 border-grey-500">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center" bis_skin_checked="1">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Jugad Notes</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          {/* <Link exact to="new_notes" className="logo">
    <button className="add-new bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
    <span className="material-symbols-outlined">add</span>  <span>New Notes</span>
</button></Link> */}
        </div>
      </header>
      <div className="flex">
        <div className="w-3/4">
          <section className="text-gray-600 body-font relative ">
            <div className=" container px-5 py-8 mx-auto" bis_skin_checked="1">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Note</h1>
              <div className="lg:w-1/2 md:w-2/3 mx-auto " bis_skin_checked="1">
                <div className="flex flex-wrap -m-2 items-center justify-center note_preview" bis_skin_checked="1">
                  <div className="p-2 w-full" bis_skin_checked="1">
                    <div className="flex" bis_skin_checked="1">
                      <label for="name" className="leading-9 text-xl text-gray-600 mx-4">Title: </label>
                      <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div className="p-2 w-full" bis_skin_checked="1">
                    <div className="flex" bis_skin_checked="1">
                      <label for="message" className="leading-9 text-xl text-gray-600 mx-4">Content:</label>
                      <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                  </div>
                  <div className="spinner-container"></div>

                </div>
                <div className="p-2 w-full flex" bis_skin_checked="1">
                  <AddNoteForm />
                  {/* <button onClick={handleAddNote} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button> */}
                  <button onClick={handleClickAi} className="genrate_ai flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Ai</button>
                  {/* {loading && <div className="loading-overlay">
                  <div className="loading-spinner"></div></div>} */}
                  <button onClick={handleClickReset} className="reset_ai flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Reset</button>
                </div>
              </div>
            </div>
          </section>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 mx-auto" bis_skin_checked="1">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Notes</h1>
              <div className="flex flex-wrap -m-4" bis_skin_checked="1">
                {notes && notes.map(note => <Note note={note} key={note.id}  ></Note>)}
              </div>
            </div>
          </section>
        </div>


        <div className="w-1/4 border-l-2 border-grey-500">
          <div className="container px-5 py-8 mx-auto" bis_skin_checked="1">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">To-Do</h1>
            <div className="w-full" bis_skin_checked="1">
              <div className="flex flex-wrap -m-2" bis_skin_checked="1">
                <div className="p-1 w-full" bis_skin_checked="1">
                  <div className="flex w-full" bis_skin_checked="1">
                    {/* <label for="name" className="leading-9 text-m text-gray-600 mx-4">Title</label> */}
                    <input type="text" id="todo" name="todo" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                  <div class="flex items-center mx-1">
                    <input
                      type="checkbox"
                      id="checked-checkbox"
                      checked={isChecked} // Set the checked state based on the isChecked variable
                      onChange={handleCheckboxChange} // Call handleCheckboxChange when the checkbox is clicked
                      className="w-4 my-5 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    />
                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900">Send Reminder</label>
                  </div>
                  <div className="remainder-container w-full text-left" bis_skin_checked="1">
                    {/* input of email id and time data */}
                    <label for="name" className="leading-9 text-m text-gray-600 mx-4">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <div className='flex justify-between m-0'>
                      <label for="name" className="leading-9 text-m text-gray-600 mx-4">Time</label>
                      <label for="name" className="leading-9 text-m text-gray-600 mx-4">Date</label>
                    </div>
                    <input type="time" id="time" name="time" className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <input type="date" id="date" name="date" className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                {/* <div className="p-2 w-full" bis_skin_checked="1">
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
                </div> */}
                <AddTodoForm />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
