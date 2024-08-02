import cors from 'cors';
import express from 'express';
import { authRoutes } from './routes/auth';
import { defaultRoutes } from './routes/default';
import { formRoutes } from './routes/form';
import { rolesRoutes } from './routes/roles';
import { rowRoutes } from './routes/row';
import { settingsRoutes } from './routes/settings';
import { tableRoutes } from './routes/table';
import { userRoutes } from './routes/user';

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('files'));

app.use(defaultRoutes)
app.use(settingsRoutes)
app.use(tableRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(rowRoutes)
app.use(rolesRoutes)
app.use(formRoutes)

export { app };

