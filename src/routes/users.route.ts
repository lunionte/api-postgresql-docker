import express from "express";
import { UsersController } from "../controllers/users.controllers";
import { celebrate, Segments } from "celebrate";
import { newUserSchema } from "../models/users.models";
import asynchandler from "express-async-handler";
export const userRoutes = express.Router();

userRoutes.get("/users", asynchandler(UsersController.getAllUsers));
userRoutes.post("/users", celebrate({ [Segments.BODY]: newUserSchema }), asynchandler(UsersController.createUser));
