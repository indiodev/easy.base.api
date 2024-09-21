import { authRoutes } from "../app/routes/auth.route";
import { defaultRoutes } from "../app/routes/default";
import { formRoutes } from "../app/routes/form.route";
import { rolesRoutes } from "../app/routes/roles.route";
import { rowRoutes } from "../app/routes/row.route";
import { settingsRoutes } from "../app/routes/settings.route";
import { tableRoutes } from "../app/routes/table.route";
import { userRoutes } from "../app/routes/user.route";
import { columnRoutes } from "../app/routes/column.route";

import { app } from "./kernel";

app.use(defaultRoutes);
app.use(settingsRoutes);
app.use(tableRoutes);
app.use(authRoutes);
app.use(formRoutes);
app.use(userRoutes);
app.use(rowRoutes);
app.use(rolesRoutes);
app.use(columnRoutes);

export { app as router };
