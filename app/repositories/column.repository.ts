import mongoose, { mongo } from "mongoose";
import { Models } from "@config/mongoose/schema";

export class ColumnRepository {
  constructor(table: any) {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));
  }

  async delete(args: any ): Promise<any> {

    return Models.Table.findOneAndUpdate(
      { _id: args.tableId }, 
      { 
        $pull: { 
          columns: { _id: args.data.id }
        }
      },
      { new: true } // Retorna o documento atualizado
    )
  }
}
