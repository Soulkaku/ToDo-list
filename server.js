import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { server } from "socket.io";
import exphbs from "express-handlebars";


const app = express();

const httpServer = http.createServer(app);
const io = new server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({
    layoutsDir: path.join(__dirname, "SRC/Views/Layouts"),
    default: "main",
    extname: "hbs"
}));
app.set("views", path.join(`${__dirname}/SRC/Views`));
app.use(express.static(path.join(`${__dirname}/Public`)));
app.use(express.urlencoded( {extended : true} ));
