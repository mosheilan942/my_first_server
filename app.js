import * as jsonfileService from "./jsonfileService.js"
import * as moshe from "express";
import json from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;
let myPlaintextPassword = "mosheilan";
const someOtherPlaintextPassword = "not_bacon";
const Bcrypt = bcrypt;
const app = moshe.default();
const port = 3000;

app.use(moshe.json());

async function main() {

await app.get("/all-user", async (req, res) => {
    const obj = await jsonfileService.read("./users.json");
    res.send(obj);
  });
}



await app.get("/all-user/:id", async (req, res) => {
  const obj = await jsonfileService.read("./users.json");
  let index = obj.users.findIndex((e) => e.id === req.params.id);
    index != -1 ? res.send(obj.users[index]) : null;
});

await app.post("/crate-user", (req, res) => {
  let myPlaintextPassword = req.body.password;
  let obj_user = {
    id: uuidv4(),
    email: req.body.email,
    password: req.body.password,
  };
  let velid_email = false;
  let velid_password = false;
  const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  reg.test(req.body.email) ? (velid_email = true) : null;
  if (velid_email) {
    const regpass = new RegExp(/^(?=[a-zA-Z]*[a-z])(?=[a-zA-Z]*[A-Z])[a-zA-Z0-9]{8}$/);
    regpass.test(req.body.password) ? (velid_password = true) : null;
    if (velid_password) {
      console.log("esfsf");
      Bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
        obj_user.password = hash;
        console.log("fewfee");
        const obj = await jsonfileService.read("./users.json");
        const arr = obj.users;
        arr.push(obj_user);
        res.send(arr);
        const obj_update = await jsonfileService.write("./users.json", obj);
      });
    }
  }
});

app.put("/all-user/:id", (req, res) => {
  json.readFile("./users.json", function (err, obj) {
    let email = req.body.email;
    let password = req.body.password;
    if (err) console.error(err);
    let myPlaintextPassword = password;
    let velid_email = false;
    let velid_password = false;
    const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    reg.test(email) ? (velid_email = true) : null;
    if (velid_email) {
      const regpass = new RegExp(
        /^(?=[a-zA-Z]*[a-z])(?=[a-zA-Z]*[A-Z])[a-zA-Z]{8}$/
      );
      regpass.test(password) ? (velid_password = true) : null;
      if (velid_password) {
        Bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
          password = hash;
          let index = obj.users.findIndex((e) => e.id === req.params.id);
          if (index != -1) {
            const arr = obj.users;
            arr[index].email = email;
            arr[index].password = password;
            json.writeFile("users.json", obj, function (err) {
              if (err) console.error(err);
            });
            res.send(arr);
          }
        });
      }
    }
  });
});

app.delete("/all-user/:id", (req, res) => {
  json.readFile("./users.json", function (err, obj) {
    let arr = obj.users;
    if (err) console.error(err);
    let index = arr.findIndex((e) => e.id === req.params.id);
    index != -1 ? arr.splice(index, 1) : null;
    json.writeFile("users.json", obj, function (err) {
      if (err) console.error(err);
    });
    res.send(arr);
  });
});

app.post("/login-user", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let valid = arr.filter((e) => e.email === email);
  bcrypt.compare(password, valid[0].password, function (err, result) {
  result ? res.send("User is connected") : res.send("wrong credentials");
  });
});

app.put("/all-user/addProduct/:id", (req, res) => {
  let id = req.params.id;
  json.readFile("./users.json", function (err, obj) {
    console.log(obj);
    if (err) console.error(err);
    let arr = obj.users;
    let valid = arr.findIndex((e) => e.id === id);
    if (valid != -1) {
      let title = addProduct("https://dummyjson.com/products", id);
      arr[valid].product = title;
      const reqOptions = {
        method: 'post',
        body: JSON.stringify({ id: arr[valid].id, email: arr[valid].email, password: arr[valid].password, product: arr[valid].product}),
        headers: {
        'Content-Type': 'application/json'
        }
        }
        fetch("https://jsonplaceholder.typicode.com/users", reqOptions)
        .then(resp => resp.json())
        .then(json => console.log(json));
    }
    
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});

async function addProduct(url, id) {
  let json = await fetch(url);
  let data = await json.json();
  let product_current = 0;
  let valid = data.products.filter((e) => e.id === Number(id));
  product_current = valid.title;
  return product_current
}


main()