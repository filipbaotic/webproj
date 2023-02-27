const express = require("express");
const knex = require("knex");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const db = knex({
  client: "postgres",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "fbaotic",
    password: "",
    database: "postgres",
  },
});

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json("pong");
});

// Login

app.post("/login", (req, res) => {
  db.select("email", "password")
    .from("users")
    .where("email", "=", req.body.email)
    .then(async (data) => {
      const isValid = await bcrypt.compare(req.body.password, data[0].password);

      if (isValid) {
        return db
          .select("user_id", "first_name", "last_name", "email", "date_created")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Unable to get user"));
      } else {
        res.status(400).json("");
      }
    })
    .catch((err) => res.status(400).json(""));
});

// Register + Validate

app.post("/register", async (req, res) => {
  const saltRounds = 10;

  const { email, first_name, last_name, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    const hash = await bcrypt.hash(password, saltRounds);
    await db("users")
      .insert({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hash,
      })
      .then(res.status(200).json("ok"))
      .catch((err) => res.status(400).json("Unable to register"));
  }
});

app.get("/getExhibitions", async (req, res) => {
  db.select("exhibition_id", "exhibition_name", "date_start", "date_end")
    .from("exhibitions")
    .then(async (data) => {
      res.json(data);
    });
});

app.post("/getTicket", async (req, res) => {
  const { user_id } = req.body;
  db.select("ticket_id", "exhibition", "ticket_owner")
    .from("tickets")
    .where("ticket_owner", "=", user_id)
    .then(async (data) => {
      res.json(data);
    });
});

app.post("/purchaseTicket", async (req, res) => {
  const { exhibition_id, user_id } = req.body;

  await db("tickets")
    .insert({
      exhibition: exhibition_id,
      ticket_owner: user_id,
    })
    .then(res.json(""));
});

app.listen(3000, () => {
  console.log("App is up on port " + PORT);
});
