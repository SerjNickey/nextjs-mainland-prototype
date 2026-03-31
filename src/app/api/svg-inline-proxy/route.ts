import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");

  if (!target) {
    return new NextResponse("Missing `url` query param", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let parsedTarget: URL;
  try {
    parsedTarget = new URL(target);
  } catch {
    return new NextResponse("Invalid URL", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (!/^https?:$/.test(parsedTarget.protocol)) {
    return new NextResponse("Only http/https urls are allowed", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const response = await fetch(parsedTarget.toString(), {
      redirect: "follow",
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch svg: ${response.status}`, {
        status: response.status,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const body = await response.text();
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new NextResponse("SVG proxy request failed", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
