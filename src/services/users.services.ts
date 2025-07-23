import { User } from "../models/users.models";
import { UsersRepositories } from "../repositories/users.repositories";
import bcrypt from "bcrypt";

export class UsersService {
    private userRepository: UsersRepositories;

    constructor() {
        this.userRepository = new UsersRepositories();
    }

    async findAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async createUser(user: User) {
        user.password = await bcrypt.hash(user.password!, 10);
        return await this.userRepository.createUser(user);
    }
}
