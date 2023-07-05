import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import { string } from "joi";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      "JWTSECRET",
      {
        expiresIn: "2d",
      }
    );
  },
};

export default mongoose.model("User", userSchema);
