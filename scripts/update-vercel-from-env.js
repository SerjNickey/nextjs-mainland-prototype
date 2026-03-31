/**
 * Берёт origin из .env и записывает NEXT_PUBLIC_MEDIA_ORIGIN в .env.local
 * (для next.config.ts — прокси /api). На Vercel задайте ту же переменную в Project Settings.
 * Запуск: node scripts/update-vercel-from-env.js
 */
const { readFileSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");

const root = join(__dirname, "..");

function loadOriginFromEnv() {
  try {
    const envPath = join(root, ".env");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...rest] = trimmed.split("=");
      const value = rest.join("=").trim().replace(/^["']|["']$/g, "");
      if (key === "NEXT_PUBLIC_MEDIA_ORIGIN" || key === "VITE_MEDIA_ORIGIN") {
        return value.replace(/\/$/, "");
      }
    }
  } catch {
    // .env нет
  }
  return "https://pokerplanets.pavva.org";
}

function mergeEnvLocal(origin) {
  const path = join(root, ".env.local");
  const line = `NEXT_PUBLIC_MEDIA_ORIGIN=${origin}`;
  if (!existsSync(path)) {
    writeFileSync(path, line + "\n");
    return;
  }
  const raw = readFileSync(path, "utf-8");
  const lines = raw.split(/\r?\n/);
  let replaced = false;
  const next = lines.map((l) => {
    if (/^\s*NEXT_PUBLIC_MEDIA_ORIGIN\s*=/.test(l)) {
      replaced = true;
      return line;
    }
    return l;
  });
  if (!replaced) {
    const body = next.join("\n").replace(/\n*$/, "");
    writeFileSync(path, (body ? body + "\n" : "") + line + "\n");
    return;
  }
  writeFileSync(path, next.join("\n").replace(/\n*$/, "") + "\n");
}

const origin = loadOriginFromEnv();
mergeEnvLocal(origin);
console.log(".env.local обновлён: NEXT_PUBLIC_MEDIA_ORIGIN =", origin);
