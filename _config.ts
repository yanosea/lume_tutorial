import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import paginate from "lume/plugins/paginate.ts";
import esbuild from "lume/plugins/esbuild.ts";

const site = lume({
  src: "./src",
});

site.use(jsx());
site.use(mdx());
site.use(tailwindcss());
site.use(postcss());
site.use(paginate());
site.use(esbuild());

// Blog posts collection configuration
site.data("blog", "/blog/*.mdx");
site.filter("date", (date) => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
});

site.add("assets");

export default site;
