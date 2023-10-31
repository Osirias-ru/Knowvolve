const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const courseSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
      type: Object,
      properties: {
        title: {
          type: String,
          minlength: 8,
          maxlength: 28
        },
        description: {
          type: String,
          minlength: 200,
          maxlength: 500
        },
        subjects: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Subject'
        },
        visibility: {
          type: String,
          enum: ['private', 'public'],
        },
        price: {
          type: Number
        },
        createdAt: {
          type: Date,
        }
      },
      lessons: {
        type: Array,
        item: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Lesson',
        }
      }
    } 
  }
);

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);

/**
 * @typedef Course
 */
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
