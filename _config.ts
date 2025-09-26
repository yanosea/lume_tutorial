import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({
  src: "./src",
});

site.use(jsx());
site.use(mdx());
site.use(tailwindcss());
site.use(postcss());

site.add("style.css");

export default site;
