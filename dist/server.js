import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import { DbConnection } from './config/DbConnection.js';
dotenv.config();
const app = express();
const PORT = 3000;
const connectWithDb = DbConnection();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "../");
app.set("view engine", "hbs");
app.engine('hbs', exphbs.engine({
    layoutsDir: path.join(__dirname, "SRC/Views/Layouts"),
    extname: "hbs",
    defaultLayout: "main"
}));
app.set("views", path.join(`${__dirname}/SRC/Views`));
app.use(express.static(path.join(`${__dirname}/Public`)));
app.use(express.json());
//routes(app);
connectWithDb;
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log("SERVER IS ON");
});
app.get('/todolist', (req, res) => {
    res.render("taskList", { layout: "main" });
});
app.get('/', (req, res) => {
    res.redirect('/todolist');
});
