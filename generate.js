const fs = require("fs");
let files = fs.readdirSync("./novels");
files = files.map((file) => ({
    name: file.split(".")[0],
    filepath: "novels/" + file,
}));
const data = {
    files
};

fs.writeFileSync("data.json", JSON.stringify(data));
