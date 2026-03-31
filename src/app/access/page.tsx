import type { Metadata } from "next";
import AccessPage from "@/views/AccessPage/AccessPage";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function Access() {
  return <AccessPage />;
}
