import type { Metadata } from "next";
import SochiPage from "@/views/SochiPage/SochiPage";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function Ppsochi() {
  return <SochiPage />;
}
