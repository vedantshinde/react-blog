const fs = require("fs");
const path = require("path");

let tableName;

// the cmd command would look something like: npm run create-migration -- --tableName=\table-name\

try {
  tableName = process.argv
    .find((arg) => arg.includes("--tableName="))
    .split("=")[1];
} catch (err) {
  console.log("A valid --tablename parameter was not passed. Please pass a valid --tablename paramter");
}

const fileName = new Date().getTime() + `_${tableName}.sql`;

fs.writeFile(path.resolve(__dirname, `../migrations/${fileName}`), '', (err) =>{
    if(err) throw new Error(err);
    console.log("Successfully created a migration file in the \" migrations\" folder");
});