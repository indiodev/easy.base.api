import { authRoutes } from "../app/routes/auth.route";
import { columnRoutes } from "../app/routes/column.route";
import { defaultRoutes } from "../app/routes/default";
import { formRoutes } from "../app/routes/form.route";
import { rolesRoutes } from "../app/routes/roles.route";
import { rowRoutes } from "../app/routes/row.route";
import { settingsRoutes } from "../app/routes/settings.route";
import { tableRoutes } from "../app/routes/table.route";
import { userRoutes } from "../app/routes/user.route";

import { kernel } from "./kernel";

kernel.use(defaultRoutes);
kernel.use(settingsRoutes);
kernel.use(tableRoutes);
kernel.use(authRoutes);
kernel.use(formRoutes);
kernel.use(userRoutes);
kernel.use(rowRoutes);
kernel.use(rolesRoutes);
kernel.use(columnRoutes);

export { kernel as app };
