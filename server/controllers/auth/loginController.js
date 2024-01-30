import Joi from "joi";
import { User } from "../../models";
import { CustomErrorHandler, JwtService } from "../../services";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken } from "../../models";
import bcrpt from "bcrypt";
const loginController = async (req, res, next) => {
  //* Validation
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  //* Find User
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials("Email is wrong"));
    }

    //Todo: Compare Password

    const match = await bcrpt.compare(req.body.password, user.password);

    if (!match) {
      return next(CustomErrorHandler.wrongCredentials("Passoward is Wrong"));
    }

    // JWT Token
    const accessToken = JwtService.sign({ _id: user._id, role: user.role });

    const refreshToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );

    // Saving refreshToken for Whitelist

    await RefreshToken.create({ token: refreshToken });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

export default loginController;
