import { Env } from "@config/env";
import { router } from "@start/routes";

router.listen(Env.PORT, () => {
  console.log(
    `HTTP Server running on port ${Env.PORT}, http://localhost:${Env.PORT}`,
  );
});
