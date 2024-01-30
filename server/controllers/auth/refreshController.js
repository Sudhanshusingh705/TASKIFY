import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";

const refreshController = async (req, res, next) => {
  // validation
  const refreshSchema = Joi.object({
    refreshToken: Joi.string().required(),
  });
  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  // database
  let refreshtoken;
  try {
    refreshtoken = await RefreshToken.findOne({
      token: req.body.refreshToken,
    });
    if (!refreshtoken) {
      return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
    }

    let userId;
    try {
      const { _id } = await JwtService.verify(
        refreshtoken.token,
        REFRESH_SECRET
      );
      userId = _id;
    } catch (err) {
      return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(CustomErrorHandler.unAuthorized("No user found!"));
    }

    // JWT Token
    const accessToken = JwtService.sign({ _id: user._id, role: user.role });
    const refreshToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );
    // database whitelist
    await RefreshToken.create({ token: refreshToken });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    return next(new Error("Something went wrong " + err.message));
  }
};

export default refreshController;
