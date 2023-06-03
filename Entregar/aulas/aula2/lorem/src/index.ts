import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { LoremIpsum } from "lorem-ipsum";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'index.html');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/script.js', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'script.js');
    const fileContent =  fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/javascript');
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/style.css',  (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'style.css');
    const fileContent =  fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/css');
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/lorem', (req, res) => {
   const numParagraphs = parseInt(req?.query?.numParagraphs as string);
 
   if (isNaN(numParagraphs) || numParagraphs < 1 || numParagraphs > 10) {
     res.status(400).send('Number of paragraphs must be between 1 and 10.');
     return;
   }

   const lorem = new LoremIpsum();
   const loremTexts = lorem.generateParagraphs(numParagraphs);
   const paragraphs = loremTexts.split('\n'); 
   console.log("paragraphs > ",paragraphs);

   res.json(paragraphs); 
 });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});