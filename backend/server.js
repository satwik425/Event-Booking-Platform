const app = require("./src/app");
const dbconnect = require("./src/db/db");


dbconnect();

const PORT =  3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
