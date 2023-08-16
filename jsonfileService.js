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



export function read(peth) {
  return new Promise((resolve, reject) => {
    let obj = json.readFileSync(peth) 
    resolve(obj)
    });
}


export function write(file, obj) {
  return new Promise((resolve, reject) => {
    let newfile = json.writeFileSync(file, obj) 
    resolve(newfile)
    });
}


