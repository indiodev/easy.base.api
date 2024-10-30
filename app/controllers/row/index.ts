import { Create } from "./create.controller";
import { Delete } from "./delete.controller";
import { findManyByCollection } from "./find-many-by-collection.controller";
import { Interaction } from "./interaction.controller";
import { Show } from "./show.controller";
import { Update } from "./update.controller";

export const RowController = {
  Delete,
  Create,
  Update,
  Show,
  findManyByCollection,
  Interaction,
};
