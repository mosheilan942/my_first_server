import * as moshe from "express";
import json from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;
// let myPlaintextPassword = "mosheilan";
// const someOtherPlaintextPassword = "not_bacon";
const Bcrypt = bcrypt;
const app = moshe.default();
const port = 3000;

app.use(moshe.json());



export function read(peth) {
  return new Promise((resolve, reject) => {
    let obj = json.readFileSync(peth) 
    resolve(obj)
    });
};


export function readUserByid(peth, id) {
  return new Promise(async(resolve, reject) => {
    let obj = await read(peth)
    let index = await obj.users.findIndex((e) => e.id === id);
    index != -1 ? resolve(obj.users[index]) : null; 
    });
};


export function crateNewUser(peth, body) {
  console.log(body.email);
  return new Promise((resolve, reject) => {
    let user = {
      id: uuidv4(),
      email: body.email,
      password: body.password,
    };
    Bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      if (err) console.error((err));
      user.password = hash;
      const obj = await read(peth);
      const arr = obj.users;
      arr.push(user);
      resolve(arr);
      const obj_update = await write("./users.json", obj);
    });
  })
}


export function write(file, obj) {
  return new Promise((resolve, reject) => {
    let newfile = json.writeFileSync(file, obj) 
    resolve(newfile)
    });
}

const regemail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regpass = new RegExp(/^(?=[a-zA-Z]*[a-z])(?=[a-zA-Z]*[A-Z])[a-zA-Z0-9]{8}$/);

export const validation_email = function (req, res, next) {
  let valid = false
  regemail.test(req) ? valid =  true : null
  return valid
}



