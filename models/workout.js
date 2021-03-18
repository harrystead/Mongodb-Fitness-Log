  
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter a type for your workout.",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter a name for your workout.",
        },
        duration: {
          type: Number,
          required: "Enter a duration for your workout.",
        },
        weight: { type: Number },
        reps: { type: Number },
        sets: { type: Number },
        distance: { type: Number },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;