export default function manifest() {
  return {
    id: "/",
    theme_color: "#3ECDBA",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "품앗이",
    short_name: "품앗이",
    description: "품앗이, 대학생 전문 상담 멘토링",
    icons: [
      {
        src: "/pwa-53.png",
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
        sizes: "212x212",
        type: "image/png",
      },
      {
        src: "/pwa-512.png",
        sizes: "620x620",
        type: "image/png",
      },
    ],
  };
}
