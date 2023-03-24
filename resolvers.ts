// resolvers.ts

// import { Resolvers } from './generated/graphql'
import  Course  from './models/Course'
import  Lesson  from "./models/Lesson"
console.log("Updating resolvers")
export const resolvers = {
  courses: async () => {
    console.log("Quering courses");
    // return { data: "dsa" };
    return await Course.findAll();
  },
  course: async ( { id }: any) => {
    return await Course.findByPk(id);
  },  
  lessons: async () => {
    return await Lesson.findAll({ include: [Course] });
  },
  lesson: async ( { id }: any) => {
    return await Lesson.findByPk(id, { include: [Course] });
  },
  createCourse: async (
    
    { title, description, instructorName, price, startDate, endDate }: any
  ) => {
    const course = await Course.create({
      title,
      description,
      instructorName,
      price,
      startDate,
      endDate,
    });

    return course;
  },
  updateCourse: async (
    
    { id, title, description, instructorName, price, startDate, endDate }: any
  ) => {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    await course.update({
      title: title ?? course.title,
      description: description ?? course.description,
      instructorName: instructorName ?? course.instructorName,
      price: price ?? course.price,
      startDate: startDate ?? course.startDate,
      endDate: endDate ?? course.endDate,
    });

    return course;
  },
  deleteCourse: async ( { id }: any) => {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    await course.destroy();

    return true;
  },
  createLesson: async ( { title, description, courseId }: any) => {
    const lesson = await Lesson.create({
      title,
      description,
      courseId,
    });

    return lesson;
  },
  getCourseFromLessons: async ( { courseId }:any) => {
    const lessons = await Lesson.findAll({
      where: {courseId} 
    });
    return lessons;
  },
  updateLesson: async ( { id, title, description, courseId }: any) => {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    await lesson.update({
      title: title ?? lesson.title,
      description: description ?? lesson.description,
      courseId: courseId ?? lesson.courseId,
    });

    return lesson;
  },
  deleteLesson: async ( { id }: any) => {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    await lesson.destroy();

    return true;
  },
 
};




// export { resolvers }
