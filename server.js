import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import exphbs from "express-handlebars";


const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

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


app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login", { layout : "main"});
});

app.get("/tasklist", (req, res) => {
    res.render("taskList", { layout : "main" });
});

const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`Listening in Port ${PORT} http://localhost:${PORT}/`);
});

export default io;