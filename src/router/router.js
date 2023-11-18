import { error, log } from "console";
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

//Root absolute path
const __dirname = process.cwd();
const rootJson = path.join(__dirname, "books.json");

//Books object
const json_books = fs.readFileSync(rootJson, "utf-8");
const books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index.ejs", { books });
});

router.get("/entry", (req, res) => {
  res.render("entry.ejs");
});

router.post("/entry", (req, res) => {
  const { title, author, description, image } = req.body;

  if (!title || !author || !description || !image) {
    res.status(400).send("All fields are required");
    return;
  } else {
    const newObj = {
      id: books.length + 1,
      title,
      author,
      description,
      image,
    };

    books.push(newObj);

    //Cargar los datos en el archivo JSON
    const data = JSON.stringify(books);
    fs.writeFile(rootJson, data, "utf-8", (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Data saved successfully");
      }
    });

    res.redirect("/");
  }
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id == id);
  books.splice(index, 1);
  const data = JSON.stringify(books);
  fs.writeFile(rootJson, data, "utf-8", (error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});

router.all("*", (req, res) => {
  res.render("404.ejs").status(404);
});

export default router;
