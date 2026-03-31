import type { Metadata } from "next";
import PromosPage from "@/views/PromosPage/PromosPage";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function Promos() {
  return <PromosPage />;
}
