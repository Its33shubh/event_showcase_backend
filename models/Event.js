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
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    time: {
      type: String,
      default:""
    },

    location: {
      type: String,
      default:"",
      trim: true
    },
    host_venue: {
      type: String,
      trim: true
    },

    image: {
      type: String,
      default:""
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