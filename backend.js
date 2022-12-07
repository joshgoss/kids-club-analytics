const express = require("express");
const cors = require("cors");
const data = require("./data/data.json");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/members", (req, res) => {
  const members = data.reduce((acc, d) => {
    if (!acc.includes(d.member)) {
      acc.push(d.member);
    }
    return acc;
  }, []);

  res.json({ data: members.sort() });
});

app.get("/games", (req, res) => {
  const games = data.reduce((acc, d) => {
    if (!acc.includes(d.game)) {
      acc.push(d.game);
    }
    return acc;
  }, []);

  res.json({ data: games.sort() });
});

app.get("/member_games", (req, res) => {
  res.json({ data });
});

app.listen(8000, () => {
  console.log(`Listening on port ${port}`);
});
