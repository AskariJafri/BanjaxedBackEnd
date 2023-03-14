import { Dialect, Sequelize } from "sequelize";
import * as dbConfig from "./../config/config.json"

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