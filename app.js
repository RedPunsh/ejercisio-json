import express from "express";
import rootURL from "./src/router/router.js";
import path from "path";
import morgan from "morgan";

const app = express();

//Root absolute path
const dirname = process.cwd();

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//settings
app.set("views engine", "ejs");
app.set("views", path.join(dirname, "src/views"));
app.use(express.json());

//Root URL
app.use(rootURL);

//static files
app.use(express.static(path.join(dirname, "public")));

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});

