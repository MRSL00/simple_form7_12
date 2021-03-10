const http = require("http");
const fs = require("fs");
const path = require("path");

let info = JSON.parse(fs.readFileSync("./public/users.json", "utf-8"));

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      if (req.url === "/") {
        fs.readFile("./public/form/5.html", "UTF-8", (err, html) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        });
      } else if (req.url.match(".css$")) {
        let cssPath = path.join(__dirname, "public/form", req.url);
        let fileStreamCss = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStreamCss.pipe(res);
      } else if (req.url.match(".js$")) {
        let jsPath = path.join(__dirname, "public/form", req.url);
        let fileStreamJs = fs.createReadStream(jsPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fileStreamJs.pipe(res);
      } else if (req.url.match(".jpg$")) {
        let jsPath = path.join(__dirname, "public/form", req.url);
        let fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fileStream.pipe(res);
      } else if (req.url.match(".Sahel.woff")) {
        let FontPath = path.join(__dirname, "public/form", req.url);
        let fileStreamF = fs.createReadStream(FontPath);
        res.writeHead(200, { "Content-Type": "text/font" });
        fileStreamF.pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
      }

    }
    if (req.url.match("/user") && req.method === "POST") {
      let data = "";
      req.on("data", function (chunk) {
        data += chunk.toString();
      });
      req.on("end", function () {
        data = JSON.parse(data);
        let res_status = { "flag": false };
        for (let item of info) {
          if (
            item.userName.toLowerCase() === data.userName.toLowerCase() &&
            item.password === data.password
          ) {
            res_status = { "flag": true };
          }
        }
        res.write(JSON.stringify(res_status))
        res.end();
      });
    }
  })
  .listen(3000);
console.log("Server started on port 3000 ...");
