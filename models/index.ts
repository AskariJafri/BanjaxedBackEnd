import { Dialect, Sequelize } from "sequelize";
import * as dbConfig from "./../config/config.json"
import Course from "./Course";
import Lesson from "./Lesson";


// Lesson.belongsTo(Course);

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host:dbConfig.development.host,
    dialect:dbConfig.development.dialect as Dialect,
    logging:console.log
  },

)
export {Sequelize,sequelize}