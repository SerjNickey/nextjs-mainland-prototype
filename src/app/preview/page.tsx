import type { Metadata } from "next";
import PreviewPage from "@/views/PreviewPage/PreviewPage";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Preview",
};

export default function Preview() {
  return <PreviewPage />;
}
