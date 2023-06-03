// Arquivo src/controllers/main.ts
import { LoremIpsum } from "lorem-ipsum";
import fs from "fs";
import path from "path";
import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
 res.end('Welcome to Web academy!');
};

// exemplo de rotas com parâmetros
const bemvindo  = (req: Request, res: Response) => {
   res.send(`Recebi o id ${req.params.id} e o nome ${req.params.nome}`);
};

const getjs = (req: Request, res: Response) => {
   try {
      const diretorioAnterior = path.resolve(__dirname, '../../');
      const filePath = path.join(diretorioAnterior, 'public', 'script.js');
      const fileContent =  fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'application/javascript');
      res.send(fileContent);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

const getcss = (req: Request, res: Response) => {
   try {
     const diretorioAnterior = path.resolve(__dirname, '../../');
     const filePath = path.join(diretorioAnterior, 'public', 'style.css');
     const fileContent =  fs.readFileSync(filePath, 'utf8');
     res.setHeader('Content-Type', 'text/css');
     res.send(fileContent);
   } catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
   }
 };

const getBody = (req: Request, res: Response) => {
   try {

      const publicPath = path.resolve(__dirname, '../../');

      const htmlFilePath = path.join(publicPath, 'index.html');
      const fileContentHTML = fs.readFileSync(htmlFilePath, 'utf8');

      const cssFilePath = path.join(publicPath, 'styles.css');
      const fileContentCSS = fs.readFileSync(cssFilePath, 'utf8');

      const jsFilePath = path.join(publicPath, 'script.js');
      const fileContentJS = fs.readFileSync(jsFilePath, 'utf8');

      // const filePath = path.join(diretorioAnterior, 'public', 'index.html');
      // const fileContent = fs.readFileSync(filePath, 'utf8');

      // getjs(req,res);
      // getcss(req,res);

      res.sendFile(fileContentHTML);
      res.sendFile(fileContentCSS);
      res.sendFile(fileContentJS);

      // res.sendFile(htmlFilePath);

      // Enviar o arquivo CSS
      // res.sendFile(cssFilePath);

      // Enviar o arquivo JS
      // res.sendFile(jsFilePath);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

const lorem = (req: Request, res: Response) => {
   console.log(req.query)
   getBody(req,res);
   const numParagraphs = parseInt(req?.query?.numParagraphs as string);
 
   if (isNaN(numParagraphs) || numParagraphs < 1 || numParagraphs > 10) {
     res.status(400).send('Number of paragraphs must be between 1 and 10.');
     return;
   }

   const lorem = new LoremIpsum();
   const loremTexts = lorem.generateParagraphs(numParagraphs);
   const paragraphs = loremTexts.split('\n'); // Dividir o texto em parágrafos usando o caractere de quebra de linha
   console.log("paragraphs > ",paragraphs);

   res.json(paragraphs); // Enviar o vetor de parágrafos como resposta em formato JSON
};

const hb1 = (req: Request, res: Response) => {
   res.render("hb1", { 
      mensagem: "Olá, você está aprendendo Express + HBS!",
      layout: false,
   });
};

const hb2 = (req: Request, res: Response) => {
   res.render('main/hb2', {
   nome: 'React',
   tipo: 'library',
   poweredByNode: true,
   layout: false,
   });
};

const hb3 = (req: Request, res: Response) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 }
   ];

   res.render('hb3', { profes, layout: false });     
};

const hb4 = (req: Request, res: Response) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 },
      { nome: 'Jonathas Cavalcante', sala: 1231 }
   ];

   res.render('hb4', { profes, layout: false });     
};


export default { index, bemvindo, lorem ,hb1, hb2, hb3, hb4 };