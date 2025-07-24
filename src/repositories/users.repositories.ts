import { PrismaClient } from "../generated/prisma";
import { UpdatedUserDto, UserModel, UserQueryParamsModel } from "../models/users.models";

const prisma = new PrismaClient();

export class UsersRepositories {
    async search(queryParams: UserQueryParamsModel) {
        const { id, name, email } = queryParams;

        const where: any = {};

        if (id) {
            where.id = id;
        }

        if (name) {
            where.name = {
                contains: name,
                mode: "insensitive",
            };
        }

        if (email) {
            where.email = {
                contains: email,
                mode: "insensitive",
            };
        }

        return await prisma.user.findMany({ where });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async createUser(user: UserModel) {
        return await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    }

    async updateUser(id: string, data: UpdatedUserDto) {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
}
