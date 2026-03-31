import { NextResponse } from "next/server";
import { fetchRobotsTxtBody } from "@/lib/seo";

export async function GET() {
  const body = await fetchRobotsTxtBody();
  const txt =
    body ??
    [
      "User-agent: *",
      "Allow: /",
      "",
    ].join("\n");

  return new NextResponse(txt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
