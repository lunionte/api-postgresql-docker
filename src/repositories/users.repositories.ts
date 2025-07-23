import { PrismaClient } from "../generated/prisma";
import { toUserDto, toUsersDto, User } from "../models/users.models";

const prisma = new PrismaClient();

export class UsersRepositories {
    async findAllUsers() {
        const allUsers = await prisma.user.findMany();

        return toUsersDto(allUsers);
    }

    async find(userId: string) {}

    async createUser(user: User) {
        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
        return toUserDto(createdUser);
    }
}
