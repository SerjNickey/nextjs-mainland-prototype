import type { Metadata } from "next";
import NotFoundPage from "@/views/404Page/404Page";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function NotFound() {
  return <NotFoundPage />;
}
