import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = create({
    layoutsDir: `${__dirname}/SRC/Views/Layouts`,
    extname: 'hbs',
});
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log("SERVER IS ON");
});
