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

  // Initialize all route with a callback function
  app.post("/add", callback);

  function callback(req, res) {
    // res.send("post received");
    console.log(req.body);
    // console.log(req.text);
  }

  // Respond with JS object when a GET request is made to the homepage
  app.get("/get", function (req, res) {
    res.send(projectData);
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
