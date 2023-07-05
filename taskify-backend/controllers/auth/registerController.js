import Joi from "joi";
import { User, RefreshToken } from "../../models";
import { JwtService, CustomErrorHandler } from "../../services";
import { REFRESH_SECRET } from "../../config";

import bcrypt from "bcrypt";

const registerController = async (req, res, next) => {
  // * Validation
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  //* Check User Exit
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return next(
        CustomErrorHandler.alreadyExist("This Email is Already Exist")
      );
    }
  } catch (err) {
    return next(err);
  }

  //* User Model
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  let accessToken;
  let refreshToken;
  try {
    const result = await user.save();
    accessToken = JwtService.sign({ _id: result._id, role: result.role });
    refreshToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );

    // Saving refreshToken for Whitelist
    await RefreshToken.create({ token: refreshToken });
  } catch (error) {
    return next(error);
  }
  res.status(200).json({ accessToken, refreshToken });
};

export default registerController;
