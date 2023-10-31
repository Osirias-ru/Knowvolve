const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subjectSchema = mongoose.Schema(
  {
    subject: {
      type: Array,
      item: {
        type: String,
        enum: ['Math', 'English', 'Science', 'Informatics', 'Programming', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology']
      }
    }
  }
);

subjectSchema.plugin(toJSON);
subjectSchema.plugin(paginate);

/**
 * @typedef Subject
 */
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
