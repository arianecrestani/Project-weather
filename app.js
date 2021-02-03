/* Global Variables */
const generate = document.getElementById("generate");
const textArea = document.getElementById("feelings");
const zipcode = document.getElementById("zip");

// Create a new date instance dynamically with JS
let dt = new Date();
let newDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();

/* Function called by event listener */
const generateButtonClick = () => {
  getOpenWeatherTemperature(zipcode.value).then((data) => {
    postData({
      icon: data.weather[0].icon,
      date: newDate,
      temperature: data.main.temp,
      status: data.weather[0].main,
      city: data.name,
      feelings: textArea.value,
    }); //then seria a espera de uma acao async
  });
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
const postData = async (data) => {
  console.log(data);
  const url = "http://localhost:8000/add";
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

async function getServerData() {
  const response = await fetch("/return");
  const latestEntry = await response.json();
  // checking if there is a temperature attribute
  if (latestEntry && latestEntry.temperature) {
    updateUI(latestEntry);
  }
}
const icon = document.getElementById("icon");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const status = document.getElementById("status");
const place = document.getElementById("location");
const content = document.getElementById("content");

function updateUI(weather) {
  console.log(weather);

  icon.innerHTML = `<img src="svg/${weather.icon}.svg" alt="nothing yet" />`;
  date.innerHTML = weather.newDate ? weather.newDate : "";
  temp.innerHTML = `${weather.temperature}°C`;
  status.innerHTML = weather.status ? weather.status : "";
  place.innerHTML = weather.city ? weather.city : "";
  content.innerHTML = weather.userText ? weather.userText : "";
}
