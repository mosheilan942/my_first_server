// const express = require('express')

import * as moshe from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');
const saltRounds = 10;
let myPlaintextPassword = "mosheilan";
const someOtherPlaintextPassword = "not_bacon";

const Bcrypt = bcrypt;
const app = moshe.default();
const port = 3000;

app.use(moshe.json());

app.get("/all-user", (req, res) => {
  res.send(arr);
});

app.get("/all-user/:id", (req, res) => {
  let user = arr.findIndex((e) => e.id === req.params.id);
  index != -1 ? res.send(arr[user]) : null;
});

app.post("/crate-user", (req, res) => {
  let myPlaintextPassword = req.body.password;
  let obj = {
    id: uuidv4(),
    email: req.body.email,
    password: req.body.password,
  };
  Bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    obj.password = hash;
    arr.push(obj);
    res.send(arr);
  });
});

app.put("/all-user/:id", (req, res) => {
  let user = arr.findIndex((e) => e.id === req.params.id);
  if (user != -1) {
    console.log(req.body.id);
    arr[user].id = req.body.id;
    console.log(arr[user].id);
    arr[user].email = req.body.email;
    arr[user].password = req.body.password;
    res.send(arr[user]);
  }
});

app.delete("/all-user/:id", (req, res) => {
  let index = arr.findIndex((e) => e.id === req.params.id);
  index != -1 ? arr.splice(index, 1) : null;
  res.send(arr);
});

app.post("/login-user", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let valid = arr.filter((e) => e.email === email)
  bcrypt.compare(password, valid[0].password, function (err, result) {
    result ? res.send("User is connected") : res.send("wrong credentials");
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});

const arr = [
  { id: "1", email: "qwe", password: "789" },
  { id: "2", email: "dod", password: "000" },
  { id: "3", email: "mom", password: "786" },
];
