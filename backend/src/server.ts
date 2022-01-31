const express = require("express");
const app = express();

const PORT = process.env.PORT || '4000';

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //res.send("Hello, ft_transcendence !");
    res.render("index");
});

app.get("/game", (req, res) => {
    res.render("game", { user: "rbourgea"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
