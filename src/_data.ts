export const layout = "MdxPageLayout.tsx";

// Site metadata
export const site = {
  title: "My Blog",
  description: "A blog about my hobbies and lifestyle",
  lang: "ja",
};

// Default page metadata
export const metas = {
  site: "=site.title",
  title: "=title",
  description: "=description",
  lang: "=site.lang",
  twitter: "@username", // TODO: Change to your actual Twitter account
};

export function url(page: Lume.Page) {
  if (page.src.path === "index") {
    return "/";
  }
  return page.src.path + ".html";
}
