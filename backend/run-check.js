require("dotenv").config();
const { runFollowNewsCheck } = require("./follow-news-check");

const force = process.argv.includes("--force");

runFollowNewsCheck({ force })
  .then(() => { console.log("Gotowe"); process.exit(0); })
  .catch((err) => { console.error(err); process.exit(1); });
