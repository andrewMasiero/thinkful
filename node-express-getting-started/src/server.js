const { PORT = 5000 } = process.env; //assign process.env value; 5000 is default value, if none exists

const app = require("./app"); //import and assign the app module from within the same folder as "app"

const listener = () => {
  console.log(`Listening to port: ${PORT}!`);
  console.log("This does not serve any actual html.");
};
app.listen(PORT, listener);
