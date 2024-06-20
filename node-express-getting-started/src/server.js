const { PORT = 5000 } = process.env;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}!`);
  console.log("This does not serve any actual html.");
});
