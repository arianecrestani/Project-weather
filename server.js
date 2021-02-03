const { request } = require("express");

function createExpressApp() {
  // Express to run server and routes
  const express = require("express");
  // Start up an instance of app
  const app = express();
  /* Dependencies */
  const bodyParser = require("body-parser");
  /* Middleware*/

  //Here we are configuring express to use body-parser as middle-ware.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // Cors for cross origin allowance
  const cors = require("cors");
  app.use(cors());
  // Initialize the main project folder
  app.use(express.static("website"));

  return app;
}

function setupEndPoint(app) {
  const projectData = [];
  // Respond with JS object when a GET request is made to the homepage
  app.get("/get", function (request, response) {
    response.send(projectData);
    console.log("get resquest to homepage");
  });
}

const app = createExpressApp();
setupEndPoint(app);

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}
app.post("/add", postData);

function postData(request, response) {
  projectData = request.body;
  response.send({ message: "Post received" });
  console.log(projectData);
}
