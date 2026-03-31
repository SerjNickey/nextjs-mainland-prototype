import type { Metadata } from "next";
import PokerSchoolPage from "@/views/PokerSchoolPage/PokerSchoolPage";
import { buildMetadataForLocale } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataForLocale("en");
}

export default function PokerSchool() {
  return <PokerSchoolPage />;
}
