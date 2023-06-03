import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type logFormatPlus = "simples" | "completo";

function accessLogger(req: Request, res: Response, next: NextFunction) {
  if (Object.keys(req.query).length === 0) {
    return next();
  }

  const logFormat = req.query.logFormat as logFormatPlus;
  if (logFormat !== 'simples' && logFormat !== 'completo') {
    return res.status(400).json({ error: 'Formato de log inválido.' });
  }

  const accessData = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
  };

  const logFolderPath = process.env.LOG_FOLDER_PATH ?? "null";
  const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
  const logFilePath = path.join(logFolderPath, logFileName);

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