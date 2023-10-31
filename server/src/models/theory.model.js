const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');

const theorySchema = mongoose.Schema(
  {
    theory: {
      type: Array,
      item: Object,
      properties: {
        video: {
          type: String,
          validate(value) {
            if (!validator.isUrl(value)) {
              throw new Error('Invalid url');
            }
          },
        },
        text: {
          type: String
        }
      }
    }
  }
);

theorySchema.plugin(toJSON);

/**
 * @typedef Theory
 */
const Theory = mongoose.model('Theory', theorySchema);

module.exports = Theory;
