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
const rankRoutes = require("./routes/rankRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const blocksRoutes = require("./routes/blocksRoutes");
const newsRoutes = require("./routes/newsRoutes");
const sejmRoutes = require("./routes/sejmRoutes");
const legislationRoutes = require("./routes/legislationRoutes");
const senatRoutes = require("./routes/senatRoutes");
const judicialRoutes = require("./routes/judicialRoutes");
const followRoutes = require("./routes/followRoutes");
const adminRoutes = require("./routes/adminRoutes");
const expertRoutes = require("./routes/expertRoutes");
const reportRoutes = require("./routes/reportRoutes");
const cron = require("node-cron");
const { runLeadershipUpdate } = require("./update-leadership");
const { runPresidentUpdate } = require("./update-president");
const { runChancelleryUpdate } = require("./update-chancellery");
const { runFollowNewsCheck } = require("./follow-news-check");
const appealRoutes = require("./routes/appealRoutes");
const { warmupBillsCache } = require("./controllers/legislationController");
const { warmupCommitteesCache, warmupInterpellationsCache, warmupWrittenQuestionsCache } = require("./controllers/sejmController");

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
app.use(rankRoutes)
app.use(coursesRoutes)
app.use(blocksRoutes);
app.use(newsRoutes);
app.use(sejmRoutes);
app.use(legislationRoutes);
app.use(senatRoutes);
app.use(judicialRoutes);
app.use(followRoutes);
app.use(adminRoutes);
app.use(expertRoutes);
app.use(reportRoutes);
app.use(appealRoutes);
app.use(errorHandler);

initSocket(server);

// Co 1. dnia każdego miesiąca o 04:00
cron.schedule("0 4 1 * *", () => {
  console.log("[cron] Aktualizacja kierownictwa ministerstw…");
  runLeadershipUpdate().catch(err =>
    console.error("[cron] Błąd aktualizacji kierownictwa:", err.message)
  );
});

// Co 1. dnia każdego miesiąca o 04:30
cron.schedule("30 4 1 * *", () => {
  console.log("[cron] Aktualizacja danych prezydenta…");
  runPresidentUpdate().catch(err =>
    console.error("[cron] Błąd aktualizacji prezydenta:", err.message)
  );
});

// Co 1. dnia każdego miesiąca o 05:00
cron.schedule("0 5 1 * *", () => {
  console.log("[cron] Aktualizacja kierownictwa Kancelarii Prezydenta…");
  runChancelleryUpdate().catch(err =>
    console.error("[cron] Błąd aktualizacji KPRP:", err.message)
  );
});

// Co 30 minut
cron.schedule("*/30 * * * *", () => {
  console.log("[cron] Sprawdzanie aktualności obserwowanych instytucji…");
  runFollowNewsCheck().catch(err =>
    console.error("[cron] Błąd sprawdzania aktualności:", err.message)
  );
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
  warmupBillsCache()
    .then(() => console.log("[warmup] Cache druków ustaw gotowy"))
    .catch(err => console.error("[warmup] Błąd pobierania druków:", err.message));
  warmupCommitteesCache()
    .then(() => console.log("[warmup] Cache komisji gotowy"))
    .catch(err => console.error("[warmup] Błąd pobierania komisji:", err.message));
  warmupInterpellationsCache()
    .then(() => console.log("[warmup] Cache interpelacji gotowy"))
    .catch(err => console.error("[warmup] Błąd pobierania interpelacji:", err.message));
  warmupWrittenQuestionsCache()
    .then(() => console.log("[warmup] Cache zapytań pisemnych gotowy"))
    .catch(err => console.error("[warmup] Błąd pobierania zapytań:", err.message));
});
