// const express = require('express')

import * as moshe from "express";

const app = moshe.default();

const port = 3000;

app.use(moshe.json())

app.get("/all-user", (req, res) => {
  res.send(arr);
});

app.get("/all-user/:id", (req, res) => {
    let user = arr.map(e => e.id).indexOf(req.body.id)
  res.send(arr[user]);
});

app.post("/crate-user", (req, res) => {
    console.log(req.body);
  let obj = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  };
  arr.push(obj);
  res.send(arr);
});

app.put("/all-user/:id", (req, res) => {
  res.send("user updeted!");
});

app.delete("/all-user", (req, res) => {
    let user = arr.map(e => e.id).indexOf(req.body.id)
    arr.splice(user, 1)
    res.send(arr)
});


app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});

const arr = [
  { id: "1", email: "qwe", password: "789" },
  { id: "2", email: "dod", password: "000" },
  { id: "3", email: "mom", password: "786" },
];
