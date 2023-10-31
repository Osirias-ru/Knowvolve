const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { courseService } = require("../services");

const createCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body, req.user);
  res.status(httpStatus.CREATED).send(course);
});

const getCourses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["title"]);
  const options = pick(req.query, ["limit", "page"]);
  const result = await courseService.queryCourses(filter, options);
  res.send(result);
});

const getCourse = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.params.courseId);
  res.send(course);
});

module.exports = {
  createCourse,
  getCourses,
  getCourse
};
