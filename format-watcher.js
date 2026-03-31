import { watch } from "fs";
import { exec } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let timeout;
const DEBOUNCE_DELAY = 1000; // Задержка 1 секунда перед запуском команды

const runFormat = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  
  timeout = setTimeout(() => {
    console.log("[Format Watcher] Запуск pnpm run format...");
    exec("pnpm run format", { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Format Watcher] Ошибка: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`[Format Watcher] stderr: ${stderr}`);
        return;
      }
      console.log(`[Format Watcher] Форматирование завершено`);
    });
  }, DEBOUNCE_DELAY);
};

// Следим за изменениями в папке src
const srcPath = join(__dirname, "src");
watch(srcPath, { recursive: true }, (eventType, filename) => {
  if (filename && /\.(ts|tsx|js|jsx|json|css|scss|md)$/.test(filename)) {
    console.log(`[Format Watcher] Изменен файл: ${filename}`);
    runFormat();
  }
});

console.log("[Format Watcher] Запущен. Слежу за изменениями в папке src...");
