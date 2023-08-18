import * as jsonfileService from "./jsonfileService.js"
import * as all_express from "express";
import json from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {printParams, checkvalid} from "./my-middleware.js";




const saltRounds = 10;
let myPlaintextPassword = "mosheilan";
const someOtherPlaintextPassword = "not_bacon";
const Bcrypt = bcrypt;
const app = all_express.default();
const port = 3000;

app.use(all_express.json());

async function main() {

await app.get("/all-user", async (req, res) => {
    const obj = await jsonfileService.read("./users.json");
    res.send(obj);
    
  });
}


await app.get("/all-user/:id", async (req, res) => {
  const obj = await jsonfileService.readUserByid("./users.json", req.params.id);
  res.send(obj);
});


await app.post("/crate-user", checkvalid, async(req, res) => {
  const obj = await jsonfileService.crateNewUser("./users.json", req.body);
  res.send(obj);
});


await app.put("/all-user/:id", checkvalid, async (req, res) => {
  const obj = await jsonfileService.updateUser("./users.json", req.body, req.params.id);
  res.send(obj);
});

await app.delete("/all-user/:id", async (req, res) => {
  const obj = await jsonfileService.deleteUserByid("./users.json", req.params.id);
  res.send(obj);
});

await app.post("/login-user", async(req, res) => {
  const obj = await jsonfileService.logInUser("./users.json", req.body);
  res.send(obj);
});

await app.put("/all-user/addProduct/:id", async (req, res) => {
  const obj = await jsonfileService.addProductById("./users.json", req.params.id);
  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});


main()






