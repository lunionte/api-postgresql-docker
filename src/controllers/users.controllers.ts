import { Request, Response } from "express";
import { UsersService } from "../services/users.services";

export class UsersController {
    static async getAllUsers(req: Request, res: Response) {
        res.json(await new UsersService().findAllUsers());
    }

    static async createUser(req: Request, res: Response) {
        const user = req.body;
        const createdUser = await new UsersService().createUser(user);
        res.json({ usuario: createdUser });
    }
}
