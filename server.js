const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const employeeRouter = require("./routes/employees");

const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/emp", employeeRouter);

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://arianvsh:Fifa1380@cluster0.qpx7gd9.mongodb.net/assignment_one?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.send("<h1>Assignment 1</h1>");
});

app.listen(8080, () => {
  console.log(`Server is listening on port http://localhost:${8080}`);
});
