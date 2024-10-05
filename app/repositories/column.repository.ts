import mongoose from "mongoose";

import { Env } from "@config/env";
import { Models } from "@config/mongoose/schema";

export class ColumnRepository {
  constructor(table: any) {
    mongoose.connect(Env.DATABASE_URL).then(() => console.log("Connected!"));
  }

  async delete(args: any): Promise<any> {
    return Models.Table.findOneAndUpdate(
      { _id: args.tableId },
      {
        $pull: {
          columns: { _id: args.data.id },
        },
      },
      { new: true }, // Retorna o documento atualizado
    );
  }
}
