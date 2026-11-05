const http = require("http");
const fs = require("fs");
const path = require("path");

// All settings live right here in the code. No .env file, no dependencies.
// Fine for demos, but never put real secrets in code you share or commit.
const config = {
  port: 4000,
  siteName: "Bean There Cafe",
  tagline: "Coffee served with hardcoded settings",
};

// Read index.html and fill in the {{placeholders}} with our settings
function renderIndex() {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  return html
    .replaceAll("{{SITE_NAME}}", config.siteName)
    .replaceAll("{{TAGLINE}}", config.tagline)
    .replaceAll("{{PORT}}", config.port);
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(renderIndex());
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(config.port, () => {
  console.log(`${config.siteName} running at http://localhost:${config.port}`);
});
