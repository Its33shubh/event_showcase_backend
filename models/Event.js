import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming"
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    video: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Event", eventSchema);