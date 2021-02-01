/* Global Variables */
const generate = document.querySelector('.generate');
const textArea = document.querySelector('textarea');
const zipcode = document.querySelector('input');

// Create a new date instance dynamically with JS
let dt = new Date();
let newDate = dt.getMonth()+ 1 + '/' + dt.getDate()+ '/' + dt.getFullYear();

//---------------//
//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
let baseUrl = 'api.openweathermap.org/data/2.5/weather?q={germany}&appid='
let apiKey = '96516fe8a09b3dba396ec9ffdb642eac';
//check the server for latest values of the page
const newDay =document.getElementById ('zip').value;
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', boxClick);
/* Function called by event listener */
function boxClick() {
    let textValue = textArea.value;
    let zipValue = zipcode.value;

    getWeather(zipValue, textValue).then(() => {
        //getServerData();
    });
}


/* Function to GET Web API Data*/

const getApi = async (zipcode,textArea)=>{

  const res = await fetch(zipcode + textArea);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}



//api

//fetch api

/* Function to POST data */

// get project data and update the UI

// checking if there is a temperature attribute

