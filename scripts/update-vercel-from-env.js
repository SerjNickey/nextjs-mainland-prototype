/**
 * Подставляет VITE_MEDIA_ORIGIN из .env в vercel.json (destination для /api).
 * Запускайте после изменения .env: node scripts/update-vercel-from-env.js
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  try {
    const envPath = join(root, ".env");
    const content = readFileSync(envPath, "utf-8");
    const line = content
      .split("\n")
      .find((l) => l.startsWith("VITE_MEDIA_ORIGIN="));
    if (line) {
      const value = line.slice("VITE_MEDIA_ORIGIN=".length).trim().replace(/^["']|["']$/g, "");
      return value.replace(/\/$/, "");
    }
  } catch {
    // .env не найден — используем значение из .env.example
  }
  return "https://pokerplanets.pavva.org";
}

const origin = loadEnv();
const vercelPath = join(root, "vercel.json");
const vercel = JSON.parse(readFileSync(vercelPath, "utf-8"));

const apiRewrite = vercel.rewrites?.find((r) => r.source === "/api/:path*");
if (apiRewrite) {
  apiRewrite.destination = `${origin}/api/:path*`;
  writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + "\n");
  console.log("vercel.json обновлён: destination =", apiRewrite.destination);
} else {
  console.warn("В vercel.json не найден rewrite для /api/:path*");
}
