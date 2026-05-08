require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const tileRoutes = require("./routes/tileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.use(tileRoutes);
app.use(dashboardRoutes);
app.use(profileRoutes);
app.use(surveyRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
