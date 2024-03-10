const http = require("http");
require("dotenv").config();
const app = require("./app/app");

const PORT = process.env.PORT;

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
