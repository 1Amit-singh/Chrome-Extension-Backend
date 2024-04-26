const express = require("express");
require("dotenv").config();
let { igApi, getCookie } = require("insta-fetcher");
const cors = require("cors");

// using constructor
let ig = new igApi("your cookie");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// you can get sesion id by using getSessionId function, it requires username & password

app.get("/:id", (req, res) => {
  try {
    (async () => {
      const session_id = await getCookie(
        process.env.INSTA_USERNAME,
        process.env.INSTA_PASSWORD
      );
      // console.log(session_id);

      let ig = new igApi(session_id);
      console.log("Session Created");

      ig.fetchUser(req.params.id)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          console.error("Error fetching user:", error.message);
          res.status(500).json({ error: "Error fetching user" });
        });
    })();
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3333, function () {
  console.log("Port is listening on 3333");
});
