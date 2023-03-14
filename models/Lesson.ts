// models/Lesson.ts

import { Model, DataTypes, Optional } from "sequelize";
// import { sequelize } from '../db'
import { sequelize } from ".";
import Course from "./Course";

interface LessonAttributes {
  id?: number;
  title: string;
  description: string;
  courseId: number;
  updatedAt: string;
  createdAt: string;
}

// interface LessonCreationAttributes extends Optional<LessonAttributes, "id"> {}
interface LessonInstance extends Model<LessonAttributes>, LessonAttributes {}

const Lesson = sequelize.define<LessonInstance>("lesson", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  courseId: DataTypes.INTEGER,
  updatedAt: DataTypes.DATEONLY,
  createdAt: DataTypes.DATEONLY,
});

Lesson.belongsTo(Course, { foreignKey: "courseId" });
export default Lesson;
