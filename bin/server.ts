// import "module-alias/register";

import { Env } from "@config/env";
import { router } from "@start/routes";

router.listen(Env.PORT, () => {
  console.info(
    `HTTP Server running on port ${Env.PORT}, http://localhost:${Env.PORT}`,
  );
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rejeição não tratada na Promise:", promise, "Motivo:", reason);
  // Você pode opcionalmente encerrar o processo aqui para evitar comportamento inesperado
  process.exit(1); // Opcional
});
