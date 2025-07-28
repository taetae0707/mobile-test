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
        src: "/pwa-53",
        sizes: "53x53",
        type: "image/png",
      },
      {
        src: "/pwa-80.png",
        sizes: "80x80",
        type: "image/png",
      },
      {
        src: "/pwa-106.png",
        sizes: "106x106",
        type: "image/png",
      },
      {
        src: "/pwa-160.png",
        sizes: "160x160",
        type: "image/png",
      },
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
