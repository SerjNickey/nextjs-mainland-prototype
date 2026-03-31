import type { Metadata } from "next";
import HomePage from "@/views/HomePage/HomePage";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function Home() {
  return <HomePage />;
}
