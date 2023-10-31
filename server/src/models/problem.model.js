const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { problemTypes } = require('../config/problems');

const problemSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: [problemTypes.TEST, problemTypes.ONLY_ANSWER, problemTypes.FULL, 
        problemTypes.FILL_GAPS, problemTypes.CORRECT_ORDER, problemTypes.CODE]
    },
    condition: {
      type: String
    },
    trueAnswer: {
      
    }
  }
);

problemSchema.plugin(toJSON);

/**
 * @typedef Problem
 */
const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
