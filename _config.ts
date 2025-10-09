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

// Helper to extract TOC from raw MDX content
site.helper("extractToc", (content: string) => {
  const headings: Array<{ text: string; slug: string; level: number }> = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Skip h1 (page title)
    if (level > 1) {
      headings.push({ text, slug, level });
    }
  }

  return headings;
}, { type: "filter" });

// Process MDX pages to extract TOC before rendering
site.preprocess([".mdx"], async (pages) => {
  for (const page of pages) {
    // Read the source file content
    try {
      const fullPath = `${site.options.src}${page.src.path}${page.src.ext}`;
      const sourceFile = await Deno.readTextFile(fullPath);

      // Extract frontmatter to skip the title
      const frontmatterMatch = sourceFile.match(/^---\n([\s\S]*?)\n---/);
      const contentAfterFrontmatter = frontmatterMatch
        ? sourceFile.slice(frontmatterMatch[0].length)
        : sourceFile;

      // Remove code blocks to avoid matching # inside them
      const contentWithoutCodeBlocks = contentAfterFrontmatter.replace(
        /```[\s\S]*?```/g,
        "",
      );

      const headings: Array<{ text: string; slug: string; level: number }> = [];
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      let match;

      while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        // Include all headings (h1-h6)
        headings.push({ text, slug, level });
      }

      if (headings.length > 0) {
        page.data.toc = headings;
      }
    } catch (e) {
      console.error(
        `Error reading file for TOC: ${
          e instanceof Error ? e.message : String(e)
        }`,
      );
    }
  }
});

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
site.use(codeHighlight({
  theme: {
    name: "atom-one-dark",
    cssFile: "/assets/style.css",
    placeholder: "/* insert-code-theme */",
  },
}));

// Add IDs to headings in HTML output
site.process([".html"], (pages) => {
  for (const page of pages) {
    if (page.document) {
      const headings = page.document.querySelectorAll(
        "main h1, main h2, main h3, main h4, main h5, main h6",
      );

      headings.forEach((heading) => {
        const text = heading.textContent || "";
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        heading.setAttribute("id", slug);
      });
    }
  }
});

site.add("assets");

export default site;
