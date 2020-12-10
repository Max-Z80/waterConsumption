"use strict";

const http = require("http");
const fs = require("fs");
const connect = require("connect");
const bodyParser = require("body-parser");

const DataHandler = require("./DataHandler");
const Consumption = require("./Consumption");

const PORT = 1234;

/** Initialize the server
 * @param {*} flags
 */
async function init(flags) {
  const app = connect();

  // parse urlencoded request bodies into req.body
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/public/index.html", (req, res, next) => {
    const buffer = fs.readFileSync("./public/index.html");
    res.end(buffer);
  });
  app.use("/public/chart.js", (req, res, next) => {
    const buffer = fs.readFileSync("./public/chart.js");
    res.end(buffer);
  });
  app.use("/public/api.js", (req, res, next) => {
    const buffer = fs.readFileSync("./public/api.js");
    res.end(buffer);
  });
  app.use("/public/consumptionFormPanel.js", (req, res, next) => {
    const buffer = fs.readFileSync("./public/consumptionFormPanel.js");
    res.end(buffer);
  });
  app.use("/public/menu.js", (req, res, next) => {
    const buffer = fs.readFileSync("./public/menu.js");
    res.end(buffer);
  });

  app.use("/add", (req, res, next) => {
    // to do , check that the date is not already existing
    let consumption = new Consumption();
    consumption.parse(req.body);
    DataHandler().append(consumption);
    res.end();
  });

  app.use("/get", (req, res, next) => {
    const consumptions = DataHandler().read();
    res.end(JSON.stringify(consumptions));
  });

  app.use("/edit", (req, res, next) => {
    const consumption = new Consumption();
    consumption.parse(req.body);

    let consumptions = DataHandler().read();
    consumptions = DataHandler().replaceByDate(consumptions, consumption);
    DataHandler()
      .write(consumptions)
      .then(() => res.end());
  });

  app.use("/", (req, res, next) => {
    res.end("welcome to consumptionChecker");
  });

  await http.createServer(app).listen(PORT);
}

init();

module.exports = {
  init
};
