import { authRoutes } from "../app/routes/auth";
import { defaultRoutes } from "../app/routes/default";
import { formRoutes } from "../app/routes/form";
import { rolesRoutes } from "../app/routes/roles";
import { rowRoutes } from "../app/routes/row";
import { settingsRoutes } from "../app/routes/settings";
import { tableRoutes } from "../app/routes/table";
import { userRoutes } from "../app/routes/user";

import { app } from "./kernel";

app.use(defaultRoutes);
app.use(settingsRoutes);
app.use(tableRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(rowRoutes);
app.use(rolesRoutes);
app.use(formRoutes);

export { app as router };
