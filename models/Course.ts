// models/Course.ts

import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from ".";
import Lesson from "./Lesson";

interface CourseAttributes {
  id?: number;
  courseId?: number;
  title?: string;
  description?: string;
  instructorName?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  updatedAt: string;
  createdAt:string;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, "id"> {
 
}
interface CourseInstance extends Model<CourseAttributes>, CourseAttributes {
 
}
const Course = sequelize.define<CourseInstance>(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    courseId:DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    instructorName: DataTypes.STRING,
    price: DataTypes.FLOAT,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    updatedAt: DataTypes.DATEONLY,
    createdAt: DataTypes.DATEONLY,
  }
);

export default Course;
