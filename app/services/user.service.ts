import { UserDocument as User } from "@config/mongoose/schema";
import { UserCreate, UserTableUpdate, UserUpdate } from "@dto/user.dto";
import { UserRepository } from "@repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async show(id: string): Promise<User> {
    const user = await this.userRepository.findUnique({
      _id: id,
    });

    if (!user) throw new Error("Usuário não encontrado.");
    // const userWithoutPassword = exclude(user, ["password"]);
    user.password = "";

    return user;
  }

  async list(): Promise<Partial<User>[]> {
    const users = await this.userRepository.findMany({});

    return users;
  }

  async create(payload: UserCreate): Promise<Partial<User>> {
    const user = await this.userRepository.create({
      ...payload,
    });
    return user;
  }

  async update({ id, ...payload }: UserUpdate): Promise<Partial<User | null>> {
    const user = await this.userRepository.update(id!, {
      email: payload.email,
      name: payload.name,
      password: payload.password,
    });
    return user;
  }

  async delete(id: string): Promise<User | null> {
    return await this.userRepository.delete(id);
  }

  async updateTable({
    id,
    tableId,
    layout,
    column_order,
  }: UserTableUpdate): Promise<void> {
    const user = await this.userRepository.findUnique({
      _id: id!,
    });

    const config = user?.config || {};
    const table = user?.config?.table ?? {};
    const path = table[tableId!] || {};

    console.log(path);

    const updatedLayout = layout ?? path.layout;
    const updatedColumnOrder = {
      ...path.column_order,
      ...(column_order?.root && { root: column_order.root }),
      ...(column_order?.form && { form: column_order.form }),
    };

    await this.userRepository.update(id!, {
      config: {
        ...config,
        table: {
          ...table,
          [tableId!]: {
            ...path,
            layout: updatedLayout,
            column_order: updatedColumnOrder,
          },
        },
      },
    });
  }
}
