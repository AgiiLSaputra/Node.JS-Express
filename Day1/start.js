// Jalankan semua server sekaligus
const { exec } = require("child_process");

const servers = [
  { name: "Todo API", port: 3001, cmd: "node todo-api/server.js" },
  { name: "Notes API", port: 3002, cmd: "node notes-api/server.js" },
  { name: "URL Shortener", port: 3003, cmd: "node url-shortener/server.js" },
];

console.log("=== Memulai semua server ===\n");

servers.forEach((s) => {
  const child = exec(s.cmd);

  child.stdout.on("data", (data) => {
    console.log(`[${s.name}] ${data.trim()}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`[${s.name}] Error: ${data.trim()}`);
  });
});

console.log("\n=== Semua server dimulai ===");
console.log("Todo API:     http://localhost:3001");
console.log("Notes API:    http://localhost:3002");
console.log("URL Shortener: http://localhost:3003");
console.log("\nBuka browser dan akses URL di atas untuk melihat frontend-nya.");
