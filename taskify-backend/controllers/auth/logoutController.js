import Joi from "joi";
import { RefreshToken } from "../../models";
const logoutController = async (req, res, next) => {
  // validation
  const refreshSchema = Joi.object({
    refresh_token: Joi.string().required(),
  });
  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    await RefreshToken.deleteOne({ token: req.body.refresh_token });
  } catch (err) {
    return next(new Error("Something went wrong in the database"));
  }
  res.json({ status: 1 });
};
