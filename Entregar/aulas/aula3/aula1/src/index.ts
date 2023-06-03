import express, { Request, Response } from "express";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";
import logger = require("morgan");
import router from "./router/router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

const publicPath = `${process.cwd()}/public`;

app.use(logger("short"));

// Middleware para tratar rotas
app.use(router);

// Middleware para tratar arquivos estáticos
app.use('/css', express.static(`${publicPath}/css`));
app.use('/js', express.static(`${publicPath}/js`));
app.use('/img', express.static(`${publicPath}/img`));
app.use(express.static('public'));

// Middleware para tratar views
app.engine("handlebars", engine({
  helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// Rota com expressão regular
app.get(/^\/(api|rest)\/.+$/, (req, res) => {
  res.send("Envio de dados da API!");
});

app.listen(PORT, () => {
  console.log(`Express app inicia na porta ${PORT}`);
});