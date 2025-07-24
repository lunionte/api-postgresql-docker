import { toUserDto, toUsersDto, UpdatedUserDto, UserModel, UserQueryParamsModel } from "../models/users.models";
import { UsersRepositories } from "../repositories/users.repositories";
import { validate as isUuid } from "uuid";
import bcrypt from "bcrypt";

export class UsersService {
    private userRepository: UsersRepositories;

    constructor() {
        this.userRepository = new UsersRepositories();
    }

    async search(queryParams: UserQueryParamsModel) {
        const allUsers = await this.userRepository.search(queryParams);

        return toUsersDto(allUsers);
    }

    async findById(id: string) {
        if (!isUuid(id)) {
            throw new Error("ID no formato inválido");
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return toUserDto(user);
    }

    async createUser(user: UserModel) {
        user.password = await bcrypt.hash(user.password!, 10);
        const userFromDb = await this.userRepository.createUser(user);
        return toUserDto(userFromDb);
    }

    async updateUser(id: string, data: UpdatedUserDto) {
        // verifica se o usuario existe (checando pelo id)
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (data.password) {
            const isSamePassword = await bcrypt.compare(data.password, user.password);
            if (isSamePassword) {
                throw new Error("A senha não pode ser igual a anterior");
            }
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUsr = await this.userRepository.updateUser(id, data);
        return toUserDto(updatedUsr);
    }
}
