export const layout = "MdxPageLayout.tsx";

// Site metadata
export const site = {
  title: "My Blog",
  description: "A blog about my hobbies and lifestyle",
  lang: "ja",
  image: "/og-image.png", // TODO: Add your Open Graph image
};

// Default page metadata
export const metas = {
  site: "=site.title",
  title: "=title",
  description: "=description || =site.description",
  image: "=image || =site.image",
  lang: "=site.lang",
  twitter: "@username", // TODO: Change to your actual Twitter account
  keywords: [], // TODO: Add relevant keywords per page
  robots: "index, follow",
};

export function url(page: Lume.Page) {
  if (page.src.path === "index") {
    return "/";
  }
  return page.src.path + ".html";
}
