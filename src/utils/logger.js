import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const writeLog = (file, data) => {
  const logPath = path.join(logDir, file);
  const time = new Date().toISOString();

  fs.appendFileSync(
    logPath,
    `\n[${time}]\n${JSON.stringify(data, null, 2)}\n`
  );
};
