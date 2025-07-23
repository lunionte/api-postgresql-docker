import express from "express";
import { UsersController } from "../controllers/users.controllers";
import { celebrate, Segments } from "celebrate";
import { newUserSchema, updatedUserSchema } from "../models/users.models";
import asynchandler from "express-async-handler";
export const userRoutes = express.Router();

userRoutes.get("/users", asynchandler(UsersController.findAllUsers));
userRoutes.get("/users/:id", asynchandler(UsersController.findById));
userRoutes.post("/users", celebrate({ [Segments.BODY]: newUserSchema }), asynchandler(UsersController.createUser));
userRoutes.patch(
    "/users/:id",
    celebrate({ [Segments.BODY]: updatedUserSchema }),
    asynchandler(UsersController.updateUser)
);
