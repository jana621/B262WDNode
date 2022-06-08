// Express - Server

// const express = require("express");   // Third party package type: commonjs
import express from "express";   //latest syntax
// import { response } from "express";
// import { request } from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = 619;

app.use(express.json()); // To convvert all POST datas to json

// const users = [
//         {
//         "createdAt": "2021-10-01T00:49:47.780Z",
//         "name": "Bennie Aufderhar",
//         "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//         "age": 59,
//         "color": "silver",
//         "id": "5"
//         },
//         {
//         "createdAt": "2021-09-30T14:22:51.638Z",
//         "name": "Lana Witting",
//         "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//         "age": 77,
//         "color": "olive",
//         "id": "6"
//         },
//         {
//         "createdAt": "2021-09-30T18:01:06.642Z",
//         "name": "Vickie Brekke",
//         "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//         "age": 80,
//         "color": "tan",
//         "id": "7"
//         },
//         {
//         "createdAt": "2021-09-30T09:39:22.586Z",
//         "name": "Al Runolfsdottir",
//         "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//         "age": 28,
//         "color": "orange",
//         "id": "8"
//         },
//         {
//         "createdAt": "2021-09-30T18:22:41.955Z",
//         "name": "Sam Orn",
//         "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//         "age": 49,
//         "color": "indigo",
//         "id": "9"
//         },
//         {
//         "createdAt": "2021-09-30T18:30:05.224Z",
//         "name": "Grace Grimes",
//         "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//         "age": 72,
//         "color": "yellow",
//         "id": "10"
//         },
//         {
//         "createdAt": "2021-09-30T11:26:57.667Z",
//         "name": "Cindy Reinger",
//         "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//         "age": 30,
//         "color": "yellow",
//         "id": "11"
//         },
//         {
//         "createdAt": "2021-10-01T06:26:55.203Z",
//         "name": "Beth Koelpin",
//         "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//         "age": 0,
//         "color": "purple",
//         "id": "12"
//         },
//         {
//         "createdAt": "2021-09-30T12:28:17.426Z",
//         "name": "Doug Mayer",
//         "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//         "age": 25,
//         "color": "cyan",
//         "id": "13"
//         },
//         {
//         "createdAt": "2021-10-01T01:09:41.654Z",
//         "name": "Mrs. Garrett Becker",
//         "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//         "age": 20,
//         "color": "yellow",
//         "id": "14"
//         }
//         ];    

async function createConnection(){
    // const MONGO_URL = "mongodb://localhost/users";
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    // console.log("Successfully connected to local db");
    console.log("Successfully connected to atlas db");
    // const user = await client.db("users").collection("people").findOne({ id: "5" });
    // console.log(user);
    // const insertdata = client.db("users").collection("people").insertMany(users);
    return client;};

createConnection();

app.get("/", (request, response) => {
    response.send("Hola Amigo!!!");
});

app.get("/users/:id", async (request, response) => {
    console.log(request.params);
    const id = request.params.id;

    const client = await createConnection();
    const user = await client.db("users").collection("people").findOne({ id: id });
    console.log(user)
    response.send(user);
});

app.delete("/users/:id", async (request, response) => {
    console.log(request.params);
    const id = request.params.id;

    const client = await createConnection();
    const user = await client.db("users").collection("people").deleteOne({ id: id });
    console.log(user)
    response.send(user);
});

app.patch("/users/:id", async (request, response) => {
    console.log(request.params);
    const id = request.params.id;

    const client = await createConnection();
    const newData = request.body;
    console.log(id, request.body)
    const user = await client.db("users").collection("people").updateOne({ id: id }, {$set: newData});
    console.log(user)
    response.send(user);
});

app.get("/users", async (request, response) => {
    // const {color, ageGT} = request.query;
    // console.log(request.query, color, ageGT);

    const client = await createConnection();
    const users = await client.db("users").collection("people").find({}).toArray();
    console.log(users);
    response.send(users);
}); 

// Create user

app.post("/users", async (request, response) => {
    const client = await createConnection();
    const addusers = request.body;
    const result = await client.db("users").collection("people").insertMany(addusers);

    console.log(addusers, result);
    response.send(result);
});

// app.get("/users", (request, response) => {
//     const {color, ageGT} = request.query;
//     console.log(request.query, color, ageGT);

//     if(!color && !ageGT){
//         response.send(users);
//     } else if(color && !ageGT){
//         response.send(users.filter((user) => user.color === color));
//     } else if(!color && ageGT){
//         response.send(users.filter((user) => user.age >= ageGT));
//     } else {
//         response.send(users.filter((user) => user.color === color && user.age >= ageGT));
//     }
// }); 

app.listen(PORT, ()=> console.log("The server is started in", PORT));




// const users = [
//     {
//     "createdAt": "2021-10-01T00:49:47.780Z",
//     "name": "Bennie Aufderhar",
//     "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//     "age": 59,
//     "color": "silver",
//     "id": "5"
//     },
//     {
//     "createdAt": "2021-09-30T14:22:51.638Z",
//     "name": "Lana Witting",
//     "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//     "age": 77,
//     "color": "olive",
//     "id": "6"
//     },
//     {
//     "createdAt": "2021-09-30T18:01:06.642Z",
//     "name": "Vickie Brekke",
//     "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//     "age": 80,
//     "color": "tan",
//     "id": "7"
//     },
//     {
//     "createdAt": "2021-09-30T09:39:22.586Z",
//     "name": "Al Runolfsdottir",
//     "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//     "age": 28,
//     "color": "orange",
//     "id": "8"
//     },
//     {
//     "createdAt": "2021-09-30T18:22:41.955Z",
//     "name": "Sam Orn",
//     "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//     "age": 49,
//     "color": "indigo",
//     "id": "9"
//     },
//     {
//     "createdAt": "2021-09-30T18:30:05.224Z",
//     "name": "Grace Grimes",
//     "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//     "age": 72,
//     "color": "yellow",
//     "id": "10"
//     },
//     {
//     "createdAt": "2021-09-30T11:26:57.667Z",
//     "name": "Cindy Reinger",
//     "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//     "age": 30,
//     "color": "yellow",
//     "id": "11"
//     },
//     {
//     "createdAt": "2021-10-01T06:26:55.203Z",
//     "name": "Beth Koelpin",
//     "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//     "age": 0,
//     "color": "purple",
//     "id": "12"
//     },
//     {
//     "createdAt": "2021-09-30T12:28:17.426Z",
//     "name": "Doug Mayer",
//     "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//     "age": 25,
//     "color": "cyan",
//     "id": "13"
//     },
//     {
//     "createdAt": "2021-10-01T01:09:41.654Z",
//     "name": "Mrs. Garrett Becker",
//     "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//     "age": 20,
//     "color": "yellow",
//     "id": "14"
//     }
//     ];

// async function createConnection(){
//     const MONGO_URL = "mongodb://localhost/users";
//     const client = new MongoClient(MONGO_URL);
//     await client.connect();
//     console.log("Successfully connected");
//     return client;
// };

// createConnection();

// app.get("/", (request, response) => {
//     response.send("Hello Niggas!!!");
// });

// app.get("/users/:id", async (request, response) => {
//     console.log(request.params);
//     // const id = request.params.id;
//     const {id} = request.params;

//     const client = await createConnection();

//     const user = await client.db("users").collection("people").findOne({id: id});
//     console.log(user)
//     response.send(user);
// });

// app.get("/users", async (request, response) => {
//     // const {color, ageGT} = request.query;
//     const client = await createConnection();
//     const users = await client.db("users").collection("people").find({}).toArray();

//     console.log(users);
//     response.send(users)
// });   


// app.get("/users", (request, response) => {
//     const {color, ageGT} = request.query;
//     console.log(request.query, color, ageGT);

//     if(!color && !ageGT){
//         response.send(users);
//     } else if(color && !ageGT){
//         response.send(users.filter((user) => user.color === color));
//     } else if(!color && ageGT){
//         response.send(users.filter((user) => user.age >= ageGT));
//     } else {
//         response.send(users.filter((user) => user.color === color && user.age >= ageGT));
//     }
// });   

// app.get("/users ", (request, response) => {
//     response.send(users);
// })


// // localhost:619/users?color=yellow
// // ?key=value&key1=value1&key2=value2...

// app.listen(PORT, () => console.log("The server is started in", PORT));