import Joi from "joi";
import { Collection, Task } from "../models";
import { CustomErrorHandler } from "../services";

export const collectionController = {
  createCollection: async (req, res, next) => {
    // User Id
    const { _id } = req.user;
    const collectionSchema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = collectionSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const collection = new Collection({
      name: req.body.name,
      userId: req.user._id,
    });
    try {
      const result = await collection.save();
      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  updateCollection: async (req, res, next) => {
    const { _id } = req.user;
    const { collectionId } = req.params;

    const collectionSchema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = collectionSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return next(
          CustomErrorHandler.wrongCredentials("Collection Not Found")
        );
      }

      const result = await Collection.findByIdAndUpdate(
        { _id: collectionId },
        { name: req.body.name },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  deleteCollection: async (req, res, next) => {
    const userId = req.user._id;
    const { collectionId } = req.params;

    try {
      const result = await Collection.findOneAndDelete({
        _id: collectionId,
        userId,
      });
      await Task.findOneAndDelete({ collectionId });
      res.status(200).json({ _id: result._id });
    } catch (error) {
      return next(error);
    }
  },
  getCollections: async (req, res, next) => {
    const userId = req.user._id;
    console.log(userId);
    try {
      const collections = await Collection.find({ userId });
      res.status(200).json(collections);
    } catch (error) {
      return next(error);
    }
  },
  getCollection: async (req, res, next) => {
    const userId = req.user._id;
    const { collectionId } = req.params;
    try {
      const collection = await Collection.find({ userId, _id: collectionId });
      res.status(200).json(collection);
    } catch (error) {
      return next(error);
    }
  },
};
