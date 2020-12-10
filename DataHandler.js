const fs = require("fs");
const csvParse = require("csv-parse/lib/sync");
const csvStringify = require("csv-stringify");

function DataHandler() {
  const fileName = "./consumption.csv";
  const fileEncoding = "utf8";
  const csvDelimiter = ";";

  /**
   * Read and parse CSV file
   */
  function read() {
    const content = fs.readFileSync(fileName, fileEncoding);
    const parsedCSV = csvParse(content, {
      delimiter: csvDelimiter,
      columns: true
    });
    return parsedCSV;
  }

  /**
   * Find and replace a consumption within a list which as the same date
   * @param {*} consumptions list of consumption
   * @param {*} consumption the consumption which wil be used for the replacement
   */
  function replaceByDate(consumptions, consumption) {
    if (consumptions instanceof Array && consumptions.length > 0) {
      return consumptions.map(input => {
        if (consumption.date === input.date) {
          input.m3 = consumption.m3;
        }
        return input;
      });
    }
  }

  /**
   * write file
   * @returns {Promise}
   */
  function write(consumptions) {
    return new Promise((resolve, reject) => {
      csvStringify(
        consumptions,
        {
          columns: [{ key: "date" }, { key: "m3" }],
          header: true,
          delimiter: csvDelimiter
        },
        (err, output) => {
          fs.writeFile(fileName, output, { flag: "w" }, err => {
            if (err) {
              console.log("Could not write data to consumption.csv");
              reject();
              return;
            }
            resolve();
          });
          if (err) {
            console.log("Could not write data to consumption.csv");
            reject();
          }
        }
      );
    });
  }

  /**
   * Append a new consumption to the end of the file
   * @param {*} consumption the consumption to append
   */
  function append(consumption) {
    const line = consumption.getAsCSV();

    fs.writeFile(fileName, line, { flag: "a+" }, err => {
      if (err) {
        console.log("Could not write data to consumption.csv");
      }
    });
  }

  return {
    append,
    read,
    replaceByDate,
    write
  };
}

module.exports = DataHandler;
