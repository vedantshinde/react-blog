const knex = require("../mysql");
const fs = require("fs");
const path = require("path");
const promise = require("bluebird");
const db = knex.client.config.connection.database || null;

const replaceAll = (str, delimiter, replacement) => {
  return str.split(delimiter).join(replacement);
};

fs.readdir(
  path.resolve(__dirname, "../migrations"),
  "utf-8",
  (err, fileNames) => {
    if (err) throw new Error(err);
    return promise
      .each(fileNames, (fileName) => {
        return new Promise((resolve, reject) => {
          fs.readFile(
            path.resolve(__dirname, `../migrations/${fileName}`),
            "utf-8",
            (err, sql) => {
              if (err) reject(err);
              knex.raw(replaceAll(sql, "{}", db)).then(resolve);
            }
          );
        });
      })
      .then(() => console.log("Migrations have run successfully."))
      .catch((err) => {
        throw new Error(err);
      });
  }
);
