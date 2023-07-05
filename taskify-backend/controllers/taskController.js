import Joi from "joi";
import { Collection, Task } from "../models";
import { CustomErrorHandler } from "../services";

export const taskController = {
  /** Create Task */
  createTask: async (req, res, next) => {
    const { _id } = req.user;
    const { collectionId } = req.params;

    const TaskSchema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = Task.validate(req.body);

    if (error) {
      return next(error);
    }
    //* is Collection is Present
    try {
      const collection = await Collection.findOne({ _id: collectionId });
      if (!collection) {
        return next(
          CustomErrorHandler.wrongCredentials("Collection Not Found")
        );
      }

      const task = new Task({
        name: req.body.name,
        collectionId,
      });

      const result = await task.save();
      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  /** delete Task */
  deleteTask: async (req, res, next) => {
    const { _id } = req.user;
    const { collectionId, taskId } = req.params;

    try {
      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return next(
          CustomErrorHandler.wrongCredentials("Collection Not Found")
        );
      }

      const result = await Task.findOneAndDelete({ _id: taskId, collectionId });

      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  /** Update Task */
  updateTask: async (req, res, next) => {
    const { _id } = req.user;
    const { collectionId, taskId } = req.params;

    const TaskSchema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = Task.validate(req.body);

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

      const result = await Task.findOneAndUpdate(
        { _id: taskId },
        { name: req.body.name },
        { new: true }
      );

      res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  /** Get Task*/

  getTask: async (req, res, next) => {
    const { collectionId, taskId } = req.params;

    //Find task
    try {
      const task = await Task.findOne({ _id: taskId, collectionId });
      if (!task) {
        return next(CustomErrorHandler.wrongCredentials("Task not Found"));
      }
      res.status(200).json(task);
    } catch (error) {
      return next(error);
    }
  },

  /** Get All Task */
  getTasks: async (req, res, next) => {
    const { collectionId } = req.params;

    //Find tasks
    try {
      const tasks = await Task.find({ collectionId }).select([
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]);
      if (!tasks) {
        return next(CustomErrorHandler.wrongCredentials("There is no Tasks"));
      }
      res.status(200).json(tasks);
    } catch (error) {
      return next(error);
    }
  },
};
