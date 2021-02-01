/* Global Variables */
const generate = document.getElementById("generate");
const textArea = document.getElementById("fellings");
const zipcode = document.getElementById("zip");

// Create a new date instance dynamically with JS
let dt = new Date();
let newDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();

/* Function called by event listener */
const generateButtonClick = () => {
  getOpenWeatherTemperature(zipcode.value);
};

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", generateButtonClick);

/* Function to GET Web API Data*/

const getOpenWeatherTemperature = async (zipcode) => {
  let baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "96516fe8a09b3dba396ec9ffdb642eac";
  //o que divide os dois paramentros é o & comercial
  //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  const result = await fetch(
    `${baseUrl}zip=${zipcode},de&appid=${apiKey}&units=metric`
  ); // continuacao de criando uma URL
  try {
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.

//check the server for latest values of the page

// get project data and update the UI

// checking if there is a temperature attribute
