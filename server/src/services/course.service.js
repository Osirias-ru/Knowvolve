const httpStatus = require("http-status");
const { Course } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Создание курса
 * @param {Object} courseBody
 * @returns {Promise<import('../models/course.model').Course>}
 */
const createCourse = async (courseBody, user) => {
  const userID = user.id;
  const lessons = [];
  const courseInfo = courseBody;
  const course = {
    user: userID,
    course: courseInfo,
    lessons: lessons,
  };
  return Course.create(course);
};

/**
 * Список курсов
 * @param {Object} filter
 * @param {Object} options
 * @param {number} [options.limit]
 * @param {number} [options.page]
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async (filter, options) => {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
  
    const query = filter?.title || '';
    const courses = await Course.find({ 'course.title': { $regex: query, $options: 'i' } })
      .sort({ 'course.title': 1 })
      .skip((page - 1) * limit)
      .limit(limit);
  
    return courses;
  };

/**
 * Получить пользователя по id
 * @param {ObjectId} id
 * @returns {Promise<import("../models/course.model").Course>}
 */
const getCourseById = async (id) => {
  const course = Course.findById(id);
  if(!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }
  return course;
};

/**
 * Изменить курс по id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<import("../models/course.model").Course>}
 */
const updateCourseById = async (courseId, updateBody) => {
    const course = await getCourseById(courseId);
    Object.assign(course, updateBody);
    await course.save();
    return course;
  };

/**
 * Удалить курс по id
 * @param {ObjectId} courseId
 * @returns {Promise<User>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  await course.remove();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
