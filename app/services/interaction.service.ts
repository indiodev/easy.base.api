import { InteractionRepository } from "@repositories/interaction.repository";

export class InteractionService {
  constructor(private interactionRepository: InteractionRepository) {}

  async update({
    tableId,
    columnId,
    rowId,
    value,
    userId,
  }: any): Promise<void> {
    try {
      await this.interactionRepository.update(
        tableId,
        columnId,
        rowId,
        value,
        userId,
      );
    } catch (error) {
      console.error("Error updating interaction:", error);
      throw error;
    }
  }
}
