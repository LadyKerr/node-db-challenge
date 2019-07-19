const dotenv = require("dotenv");
dotenv.config();

const server = require("./api/server");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(
    `\n** server is listening on port http://localhost:${PORT} ... *** \n `
  );
});
