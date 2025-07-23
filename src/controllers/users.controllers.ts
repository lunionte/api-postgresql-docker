import { Request, Response } from "express";
import { UsersService } from "../services/users.services";
import { UpdatedUserDto, UserModel } from "../models/users.models";

export class UsersController {
    static async findAllUsers(req: Request, res: Response) {
        res.json(await new UsersService().findAllUsers());
    }

    static async findById(req: Request, res: Response) {
        const id = req.params.id;

        res.json(await new UsersService().findById(id));
    }

    static async createUser(req: Request, res: Response) {
        const user = req.body as UserModel;
        const createdUser = await new UsersService().createUser(user);
        res.status(201).json({ usuario: createdUser });
    }

    static async updateUser(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body as UpdatedUserDto;
        const updatedUser = await new UsersService().updateUser(id, data);
        res.json(updatedUser);
    }
}
