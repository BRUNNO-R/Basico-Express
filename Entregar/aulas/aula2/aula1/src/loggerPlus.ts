import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type LogFormatPlus = "simples" | "completo";

function accessLogger(req: Request, res: Response, next: NextFunction) {
  console.log("req.query -> ", req.query);
  if (Object.keys(req.query).length === 0) {
    return next();
  }

  const logFormat = req.query.logFormat as LogFormatPlus;
  console.log("logFormat -> ", logFormat);

  if (logFormat !== 'simples' && logFormat !== 'completo') {
    return res.status(400).json({ error: 'Formato de log inválido.' });
  }

  const accessData = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
  };

  const logFolderPath = process.env.LOG_FOLDER_PATH ?? "null";
  console.log("logFolderPath -> ", logFolderPath);

  const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
  console.log("logFileName -> ", logFileName);

  const logFilePath = path.join(logFolderPath, logFileName);
  console.log("logFilePath -> ", logFilePath);

  let logEntry: string;
  if (logFormat === 'completo') {
    logEntry = `${accessData.timestamp},${accessData.ip},${accessData.url},${req.httpVersion},${req.get("User-Agent")}\n`;
  } else {
    logEntry = JSON.stringify(accessData) + '\n';
  }

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Erro ao salvar o registro de acesso:', err);
    }
  });

  next();
}

export default accessLogger;