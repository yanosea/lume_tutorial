/**
 * Lume Configuration
 *
 * TODO:
 * 1. Change location URL to your actual site URL
 * 2. Update twitter account in src/_data.ts
 */

import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import paginate from "lume/plugins/paginate.ts";
import esbuild from "lume/plugins/esbuild.ts";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import feed from "lume/plugins/feed.ts";
import robots from "lume/plugins/robots.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume({
  src: "./src",
  location: new URL("https://example.com"), // TODO: Change to your actual site URL
});

site.use(jsx());
site.use(mdx());
site.use(tailwindcss());
site.use(postcss());
site.use(lightningCss());
site.use(paginate());
site.use(esbuild());
site.use(sitemap());
site.use(metas());
site.use(readingInfo({
  extensions: [".md", ".mdx"],
}));
site.use(minifyHTML());
site.use(feed({
  output: ["/feed.xml"],
  query: "type=blog",
  sort: "date=desc",
  info: {
    title: "=site.title",
    description: "=site.description",
  },
  items: {
    title: "=title",
    description: "=description",
    published: "=date",
  },
}));
site.use(robots());
site.use(date());
site.use(codeHighlight());

site.add("assets");

export default site;
