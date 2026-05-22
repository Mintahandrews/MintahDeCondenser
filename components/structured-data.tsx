export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mintah De Condenser",
    url: "https://condenser.codemintah.dev",
    description:
      "Free browser-based video compressor. Reduce video file sizes by up to 90% without uploading to any server. Supports MP4, MOV, MKV, AVI, WebM and more.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Browser-based video compression",
      "No file upload required",
      "Supports MP4, MOV, MKV, AVI, WebM, M4V, 3GP, WMV",
      "Twitter optimization (2:20 max)",
      "WhatsApp Status optimization (30s max)",
      "High/Medium/Low quality presets",
      "Audio removal option",
      "Video trimming",
      "Works offline",
      "Free to use",
    ],
    author: {
      "@type": "Person",
      name: "Andrews Mintah",
      url: "https://codemintah.dev",
      sameAs: [
        "https://github.com/mintahandrews",
        "https://buymeacoffee.com/codemintah",
      ],
    },
    creator: {
      "@type": "Person",
      name: "Andrews Mintah",
      url: "https://codemintah.dev",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
