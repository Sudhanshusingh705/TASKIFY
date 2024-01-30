import { User } from "../models";
const userController = {
  getUser: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;
