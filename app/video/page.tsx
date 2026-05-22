import type { Metadata } from "next";
import CondenseVideoClient from "./_components/condense-video-client";

export const metadata: Metadata = {
  title: "Compress Video Free Online",
  description:
    "Upload any video and compress it up to 90% smaller — entirely in your browser. No file size limits, no uploads to servers, no sign-up required. Supports MP4, MOV, MKV, AVI, WebM, WhatsApp and Twitter formats.",
  alternates: {
    canonical: "https://condenser.codemintah.dev/video",
  },
  openGraph: {
    title: "Free Online Video Compressor — Mintah De Condenser",
    description:
      "Compress any video up to 90% smaller in your browser. No uploads. No sign-up. Supports MP4, MOV, MKV, WebM, Twitter & WhatsApp presets.",
    url: "https://condenser.codemintah.dev/video",
  },
};

const Page = () => {
  return (
    <div className="pt-32 mx-auto max-w-5xl">
      <div className="lg:grid lg:grid-cols-8 gap-10 lg:h-[calc(100dvh-130px)] pb-10 px-6 lg:px-0 flex flex-col">
        <CondenseVideoClient />
      </div>
    </div>
  );
};

export default Page;
