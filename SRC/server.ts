import express from 'express';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';

const app = express();
const PORT : number = 3000;

const __filename : string = fileURLToPath(import.meta.url);
const __dirname : string = path.dirname(__filename);


const hbs = create({
    layoutsDir: `${__dirname}/SRC/Views/Layouts`,
    extname: 'hbs',
    defaultLayout: "main"
});

app.use(express.urlencoded({ extended: true}));

app.listen(PORT, () => {
    console.log("SERVER IS ON");
});

