import * as moshe from "express";
import json from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;
const Bcrypt = bcrypt;
const app = moshe.default();
const port = 3000;

app.use(moshe.json());

export function read(peth) {
  return new Promise((resolve, reject) => {
    let obj = json.readFileSync(peth);
    resolve(obj);
  });
}

export function write(file, obj) {
  return new Promise((resolve, reject) => {
    let newfile = json.writeFileSync(file, obj);
    resolve(newfile);
  });
}

export function readUserByid(peth, id) {
  return new Promise(async (resolve, reject) => {
    let obj = await read(peth);
    let index = await obj.users.findIndex((e) => e.id === id);
    index != -1 ? resolve(obj.users[index]) : null;
  });
}

export function crateNewUser(peth, body) {
  return new Promise((resolve, reject) => {
    let user = {
      id: uuidv4(),
      email: body.email,
      password: body.password,
    };
    Bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      if (err) console.error(err);
      user.password = hash;
      const obj = await read(peth);
      const arr = obj.users;
      arr.push(user);
      resolve(arr);
      const obj_update = await write("./users.json", obj);
    });
  });
}

export function updateUser(peth, body, id) {
  return new Promise(async (resolve, reject) => {
    let obj = await read(peth);
    let index = await obj.users.findIndex((e) => e.id === id);
    if (index != -1) {
      let password = body.password;
      Bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) console.error(err);
        password = hash;
        const obj = await read(peth);
        const arr = obj.users;
        arr[index].email = body.email;
        arr[index].password = password;
        const obj_update = await write("./users.json", obj);
        resolve(arr);
      });
    }
  });
}

export function deleteUserByid(peth, id) {
  return new Promise(async (resolve, reject) => {
    let obj = await read(peth);
    let arr = obj.users;
    let index = await arr.findIndex((e) => e.id === id);
    index != -1 ? arr.splice(index, 1) : null;
    const obj_update = await write("./users.json", obj);
    resolve(arr);
  });
}

export function logInUser(peth, body) {
  return new Promise(async (resolve, reject) => {
    let email = body.email;
    let password = body.password;
    let obj = await read(peth);
    let arr = obj.users;
    let valid = arr.filter((e) => e.email === email);
    bcrypt.compare(password, valid[0].password, function (err, result) {
      if (err) console.error(err);
      result ? resolve("User is connected") : resolve("wrong credentials");
    });
  });
}


export async function addProductById(peth, id) {
  return new Promise(async (resolve, reject) => {
    let obj = await read(peth);
    let arr = obj.users;
    let index = await arr.findIndex((e) => e.id === id);
    if (index != -1) {
      let title = await addProduct("https://dummyjson.com/products", id);
      arr[index].product = title;
      const obj_update = await write("./users.json", obj);
      resolve(arr);
      const reqOptions = {
        method: 'post',
        body: JSON.stringify({ id: arr[index].id, email: arr[index].email, password: arr[index].password, product: arr[index].product}),
        headers: {
        'Content-Type': 'application/json'
        }
        }
        fetch("https://jsonplaceholder.typicode.com/users", reqOptions)
        .then(resp => resp.json())
        .then(json => console.log(json));
    }
  });
}


async function addProduct(url, id) {
  let json = await fetch(url);
  let data = await json.json();
  let product_current = 0;
  let valid = await data.products.filter((e) => e.id === Number(id));
  product_current = valid[0].title;
  return product_current
}
