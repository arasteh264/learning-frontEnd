import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "یاددادی",
    short_name: "یاددادی",
    description: "پلتفرم آموزش آنلاین یاددادی",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-wide.png",
        sizes: "1904x955",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/mobile-narrow.png",
        sizes: "398x863",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
