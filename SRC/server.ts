import express, { request, Request, response, Response } from 'express';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars'
const app = express();
const PORT : number = 3000;


const __filename : string = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "../");


app.set("view engine", "hbs")
app.engine('hbs', exphbs.engine({
    layoutsDir: path.join(__dirname, "SRC/Views/Layouts"),
    extname: "hbs",
    defaultLayout: "main"
}));
app.set("views", path.join(`${__dirname}/SRC/Views`));

app.use(express.static(path.join(`${__dirname}/Public`)));
app.use(express.json());

//routes(app);

app.use(express.urlencoded({ extended: true}));

app.listen(PORT, () => {
    console.log("SERVER IS ON");
});

app.get('/todolist', (req: Request, res: Response) => {
    res.render("taskList", {layout: "main"});
});

app.get('/', (req: Request, res: Response) => {
    res.redirect('/todolist');
});