import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/actions/noteAction';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Adjust the base URL to match your server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle preflight requests
instance.interceptors.request.use(config => {
  if (config.method === 'post') {
    // Add the necessary headers for CORS preflight requests
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
  return config;
});


let constTitle = "null";
let constContent = "null";
let type = 2;


function convertTo12HourFormat(time24) {
  // Extracting hours and minutes from the time string
  const [hours, minutes] = time24.split(':').map(Number);

  // Determining the period (AM or PM)
  const period = hours >= 12 ? 'PM' : 'AM';

  // Converting hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Formatting the time in 12-hour format
  const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;

  return time12;
}


function AddTodoForm() {
  const dispatch = useDispatch();
  const checkbox = document.getElementById("checked-checkbox");
  const [sendEmailStatus, setSendEmailStatus] = useState(null);

  const SendMail = async (To, Subject, Text, Time, Date) => {
    try {
      let time12 = convertTo12HourFormat(Time);
      console.log(time12, Date);
      const response = await instance.post(
        'http://localhost:3001/send-email',
        {
          to: To,
          subject: Subject,
          text: Text,
          time: Time,
          date: Date
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        }
      );

      console.log(response.data);
      setSendEmailStatus("Successfully sent email!");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = () => {
    const title = document.getElementById("todo");
    constTitle = title.value;
    type = 2;

    if (checkbox.checked) {
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      console.log("Sending email...");
      SendMail(email, constTitle, constTitle, time, date);
    }

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
      {sendEmailStatus && <div>{sendEmailStatus}</div>}
    </div>
  );
}

export default AddTodoForm;
