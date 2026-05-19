require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const { initSocket } = require("./socket/socket");

const authRoutes = require("./routes/authRoutes");
const tileRoutes = require("./routes/tileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const errorHandler = require("./middleware/errorHandler");
const testRoutes = require("./routes/testRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const unreadNotificationRoutes = require("./routes/unreadNotificationRoutes")
const resendEmailReset = require("./routes/resendEmailRoutes")
const achievementRoutes = require("./routes/achievementRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const progressionRoutes = require("./routes/progressionRoutes");

const app = express();
const server = http.createServer(app);

const authMiddleware = require("./middleware/authMiddleware");
const activityMiddleware = require("./middleware/activityMiddleware");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(authMiddleware);
app.use(activityMiddleware);

app.use(authRoutes);
app.use(tileRoutes);
app.use(dashboardRoutes);
app.use(profileRoutes);
app.use(surveyRoutes);
app.use(notificationRoutes);
app.use(testRoutes);
app.use(unreadNotificationRoutes)
app.use(resendEmailReset)
app.use(achievementRoutes)
app.use(categoryRoutes)
app.use(progressionRoutes)
app.use(errorHandler);

initSocket(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
