const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

//middleware
app.use(express.json());

//routes
app.use("/api", authRouter);
app.use("/api", userRouter);

// Connection with db
mongoose.connect("mongodb://localhost/friendsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection
  .once("open", () => console.log("databse connection success"))
  .on("error", (err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server is listening to port 4000");
});
