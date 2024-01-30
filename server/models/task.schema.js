import mongoose, { Schema } from "mongoose";

const taskSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
