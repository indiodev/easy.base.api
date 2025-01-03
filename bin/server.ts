// import "module-alias/register";
import { Env } from "@config/env";
import connectionDB from "@config/mongoose/connect";
import { ErrorHandlerMiddleware } from "@middleware/error-handler.middleware";
import { app } from "@start/routes";
import "express-async-errors";

async function start(): Promise<void> {
  await connectionDB();

  await Promise.resolve(
    app.listen(Env.PORT, () => {
      console.info(
        `HTTP Server running on port ${Env.PORT}, http://localhost:${Env.PORT}`,
      );
    }),
  );
}
app.use(ErrorHandlerMiddleware);

start();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rejeição não tratada na Promise:", promise, "Motivo:", reason);
  // Você pode opcionalmente encerrar o processo aqui para evitar comportamento inesperado
  process.exit(1); // Opcional
});
