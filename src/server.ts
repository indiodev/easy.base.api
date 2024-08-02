import { Env } from "../config/env";
import { app } from "./app";

app.listen(Env.PORT, () => {
  console.log('HTTP Server running!');
});
