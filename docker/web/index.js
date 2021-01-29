const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ msg: "hello from docker!" });
});

// docker inspect c27b18b8d1d0 will return ip of the container
// or we can set port mapping using (8080:8080 == (local:container)) : docker run -p 8080:8080 c27b18b8d1d0
app.listen(8080, () => {
  console.log("server is up and running.");
});
