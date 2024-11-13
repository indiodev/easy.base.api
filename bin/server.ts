// import "module-alias/register";
import "express-async-errors";

import { Env } from "@config/env";
import { ErrorHandlerMiddleware } from "@middleware/error-handler.middleware";
import { app } from "@start/routes";

app.listen(Env.PORT, () => {
  console.info(
    `HTTP Server running on port ${Env.PORT}, http://localhost:${Env.PORT}`,
  );
});

app.use(ErrorHandlerMiddleware);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rejeição não tratada na Promise:", promise, "Motivo:", reason);
  // Você pode opcionalmente encerrar o processo aqui para evitar comportamento inesperado
  process.exit(1); // Opcional
});
