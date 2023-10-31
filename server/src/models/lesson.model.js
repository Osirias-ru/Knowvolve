const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lessonSchema = mongoose.Schema(
  {
    theory: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Theory'
    },
    problems: {
      type: Array,
      item:  {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Problem'
      }
    }
  }
);

lessonSchema.plugin(toJSON);
lessonSchema.plugin(paginate);

/**
 * @typedef Lesson
 */
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
