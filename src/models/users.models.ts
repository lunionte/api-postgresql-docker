import dayjs from "dayjs";
import Joi from "joi";

export interface UserModel {
    id?: string;
    email: string;
    name: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UpdatedUserDto {
    name?: string;
    email?: string;
    password?: string;
}

export function toUserDto(user: UserModel) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt ? dayjs(user.createdAt).subtract(3, "hour").toISOString() : undefined,
        updatedAt: user.createdAt ? dayjs(user.updatedAt).subtract(3, "hour").toISOString() : undefined,
    };
}

export function toUsersDto(users: UserModel[]) {
    return users.map(toUserDto);
}

export const newUserSchema = Joi.object().keys({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).required(),
});

export const updatedUserSchema = Joi.object().keys({
    name: Joi.string().trim().min(3).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().trim().min(6).optional(),
});
