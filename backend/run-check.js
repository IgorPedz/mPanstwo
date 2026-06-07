require("dotenv").config();
const http = require("http");

const force = process.argv.includes("--force");
const port  = process.env.PORT || 5000;
const path  = `/follows/check-now${force ? "?force=true" : ""}`;

console.log(`[run-check] Wywołuję ${path} na porcie ${port}…`);

const req = http.request(
  { hostname: "localhost", port, path, method: "POST" },
  (res) => {
    let body = "";
    res.on("data", (chunk) => { body += chunk; });
    res.on("end", () => {
      try {
        const json = JSON.parse(body);
        console.log("[run-check] Odpowiedź:", json.message ?? JSON.stringify(json));
      } catch {
        console.log("[run-check] Odpowiedź:", body);
      }
      process.exit(0);
    });
  }
);

req.on("error", (err) => {
  console.error("[run-check] Błąd połączenia z serwerem:", err.message);
  console.error("Upewnij się że serwer jest uruchomiony (node server.js)");
  process.exit(1);
});

req.end();
