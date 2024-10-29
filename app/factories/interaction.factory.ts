import { InteractionRepository } from "@repositories/interaction.repository";
import { InteractionService } from "@services/interaction.service";

export function InteractionFactory(): InteractionService {
  const interactionRepository = new InteractionRepository();
  return new InteractionService(interactionRepository);
}
