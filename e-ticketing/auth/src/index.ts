import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.json({
    msg: "404, Route not found!",
    meta: {
      developer: "A.S. Mohamed Faheem Anver",
      social_media: {
        facebook: "https://www.facebook.com/jstr.faheemanver/",
        linkedin: "https://www.linkedin.com/in/abdul-saleem-mohamed-faheem/",
        github: "https://github.com/asmohamedfaheemanver",
        website: "https://mohamedfaheem.netlify.app/",
      },
    },
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000!");
});
