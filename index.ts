import { TupleType } from "typescript";

// const fetch = require('node-fetch');
const fetch = (...args:any):any =>
  import("node-fetch").then(({ default: fetch }) => fetch({...args}));
const mssql = require('mssql')
require("mssql/msnodesqlv8");

const fakeAPIUrl = "https://jsonplaceholder.typicode.com";
let config = {
  server : "127.0.0.1",
  database : "CoolApp",
  port : 1433,
  user:"sa",
  // driver: "msnodesqlv8",
  password:"#Include00",
 
}

const pool = mssql.connect(config)
const resolver = {
  Query: {
    async courses() {
      try {
        const result = await pool.request().query('SELECT * FROM courses')
        return result.recordset
      } catch (err) {
        console.error(err)
      }
    }
  },
  Mutation: {
    async createCourse(parent:any, args:any) {
      const { title, description, instructorName, price, startDate, endDate } = args
      const result = await pool.request().query(`
        INSERT INTO courses (title, description, instructor_name, price, start_date, end_date)
        OUTPUT INSERTED.*
        VALUES ('${title}', '${description}', '${instructorName}', ${price}, '${startDate}', '${endDate}')
      `)
      return result.recordset[0]
    }
  },
  Course: {
    async lessons(parent:any) {
      try {
        const result = await pool.request().query(`
          SELECT * FROM lessons WHERE course_id = ${parent.id}
        `)
        return result.recordset
      } catch (err) {
        console.error(err)
      }
    }
  }
}
// const resolvers = {
//   users: async () => {
//     const response = await fetch(`${fakeAPIUrl}/users`);
//     const data = await response.json();
//     return data.map((user) => ({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         username:user.username,
//         email:user.email,
//         phone:user.phone,
//         website:user.website,
//         company:user.company,
//         address:user.address,
//     }));
//   },
//   user: async ({ id }) => {
//     const response = await fetch(`${fakeAPIUrl}/users/${id}`);
//     const user = await response.json();
//     console.log("allll", user);
//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         username:user.username,
//         email:user.email,
//         phone:user.phone,
//         website:user.website,
//         company:user.company,
//         address:user.address,
//     };
//   },
//   createUser: async ({ name, email, age }) => {
//     const response = await fetch(`${fakeAPIUrl}/users`, {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         email,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const user = await response.json();
//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         username:user.username,
//         email:user.email,
//         phone:user.phone,
//         website:user.website,
//         company:user.company,
//         address:user.address,
//     };
//   },
//   updateUser: async ({ id, name, email, age }) => {
//     const response = await fetch(`${fakeAPIUrl}/users/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         name,
//         email,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const user = await response.json();
//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         username:user.username,
//         email:user.email,
//         phone:user.phone,
//         website:user.website,
//         company:user.company,
//         address:user.address,
//     };
//   },
// };
module.exports = resolver;
