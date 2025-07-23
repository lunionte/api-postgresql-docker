import dayjs from "dayjs";
import Joi from "joi";

export interface User {
    id?: string;
    email: string;
    name: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export function toUserDto(user: User) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt ? dayjs(user.createdAt).subtract(3, "hour").toISOString() : undefined,
        updatedAt: user.createdAt ? dayjs(user.createdAt).subtract(3, "hour").toISOString() : undefined,
    };
}

export function toUsersDto(users: User[]) {
    return users.map(toUserDto);
}

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().trim().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).required(),
});
