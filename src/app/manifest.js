export default function manifest() {
  return {
    id: "/",
    theme_color: "#3ECDBA",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "poomasi",
    short_name: "poomasi",
    description: "poomasi",
    icons: [
      {
        src: "/pwa-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
