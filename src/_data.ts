export const layout = "MdxPageLayout.tsx";

export function url(page: Lume.Page) {
  if (page.src.path === "index") {
    return "/";
  }
  return page.src.path + ".html";
}
