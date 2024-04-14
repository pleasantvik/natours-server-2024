const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      index: { unique: true, sparse: true },
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  // {
  //   timestamps: true,
  // },
);

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});
tourSchema.statics.tourNameExistInDB = async function (name) {
  const tour = await this.findOne({ name });

  return !!tour;
};
const Tour = mongoose.model('Tour', tourSchema);
// Tour.createIndexes = { unique: true, name: 1 };

Tour.createIndexes({
  name: 1,
  unique: true,
});

module.exports = Tour;
