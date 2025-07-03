const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FeatureSchema = new mongoose.Schema({
  type: String,
  features: [
    {
      type: {
        type: String
      },
      id: String,
      properties: mongoose.Schema.Types.Mixed,
      geometry: {
        type: {
          type: String
        },
        coordinates: [Number]
      },
      reviews: [ReviewSchema],
      averageRating: {
        type: Number,
        default: 0
      }
    }
  ]
});

module.exports = mongoose.model('Feature', FeatureSchema);
