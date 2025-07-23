import express from "express";
import { userRoutes } from "./users.route";
import { errors } from "celebrate";

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRoutes);
    app.use(errors());
};
