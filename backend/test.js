const http = require("http");

const data = JSON.stringify({
  email: "test@example.com",
  password: "password123"
});

const req = http.request({
  hostname: "localhost",
  port: 5000,
  path: "/api/login",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    const token = JSON.parse(body).token;
    console.log("Token:", token);

    const taskReq = http.request({
      hostname: "localhost",
      port: 5000,
      path: "/api/task/",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }, (res2) => {
      let body2 = "";
      res2.on("data", chunk => body2 += chunk);
      res2.on("end", () => {
        console.log("Status:", res2.statusCode);
        console.log("Task Body:", body2);
      });
    });
    taskReq.end();
  });
});

req.write(data);
req.end();
