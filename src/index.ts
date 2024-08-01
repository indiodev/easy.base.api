import express, { Router } from 'express'
import cors from 'cors'
import { tableRoutes } from './routes/table';
import { userRoutes } from './routes/user';
import { authRoutes } from './routes/auth';
import { rowRoutes } from './routes/row';
import { defaultRoutes } from './routes/default';
import { settingsRoutes } from './routes/settings';
import { rolesRoutes } from './routes/roles';
import { formRoutes } from './routes/form';

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

app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP Server running!');
});
