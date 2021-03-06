/* Global Variables */

// get elements in Html
const generate = document.getElementById("generate");
const textArea = document.getElementById("feelings");
const zipcode = document.getElementById("zip");

// Create a new date instance dynamically with JS
let dt = new Date();
// create a new data
let newDate = dt.getDate() + "/" + (1 + dt.getMonth()) + "/" + dt.getFullYear();

/* Function called by event */
const generateButtonClick = () => {
  getOpenWeatherTemperature(zipcode.value)
    .then((wheatherData) => postData(createDataJson(wheatherData)))
    .then(() => getServerData())
    .then((serverData) => updateUI(serverData));
};

const createDataJson = (data) => {
  return {
    //create a info (json) to server
    icon: data.weather[0].icon,
    date: newDate,
    temperature: Math.floor(data.main.temp),
    status: data.weather[0].main,
    city: data.name,
    feelings: textArea.value,
  };
};

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", generateButtonClick);

/* Function to GET Web API Data*/
const getOpenWeatherTemperature = async (zipcode) => {
  const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
  const apiKey = "96516fe8a09b3dba396ec9ffdb642eac";

  return await fetch(`${baseUrl}zip=${zipcode},de&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// Async POST Function to POST data 
const postData = async (data) => {
  console.log(data);
  return await fetch("http://localhost:8000/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const getServerData = async () => {
  const url = "http://localhost:8000/get";
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

function updateUI(weather) {
  const icon = document.getElementById("icon");
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const status = document.getElementById("status");
  const city = document.getElementById("location");
  const content = document.getElementById("content");

  icon.innerHTML = `<img src="svg/${weather.icon}.svg" alt="nothing yet" />`;
  date.innerHTML = weather.date ? weather.date : "";
  temp.innerHTML = `${weather.temperature}°C`;
  status.innerHTML = weather.status ? weather.status : "";
  city.innerHTML = weather.city ? weather.city : "";
  content.innerHTML = weather.feelings ? weather.feelings : "";

  textArea.value = "";
  zipcode.value = "";
  
}
