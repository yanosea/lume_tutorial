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
import wawoff2 from "wawoff2";

// Font setup configuration
const FONT_CONFIG = {
  FONTS_DIR: "./src/assets/fonts",
  FONT_FILE: "PlemolJP-Regular.woff2",
  TTF_FILE: "PlemolJP-Regular.ttf",
  GITHUB_REPO: "yuru7/PlemolJP",
  ASSET_PREFIX: "PlemolJP_",
  EXCLUDED_VARIANTS: ["NF", "HS"],
} as const;

// Type definitions for GitHub API responses
interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

/**
 * Check if font file already exists
 */
async function fontExists(fontPath: string): Promise<boolean> {
  try {
    await Deno.stat(fontPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch latest PlemolJP release information from GitHub
 */
async function fetchLatestRelease(): Promise<GitHubRelease> {
  const response = await fetch(
    `https://api.github.com/repos/${FONT_CONFIG.GITHUB_REPO}/releases/latest`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch release info: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

/**
 * Find the appropriate PlemolJP asset (excluding NF and HS variants)
 */
function findPlemolJPAsset(assets: GitHubAsset[]): GitHubAsset {
  const asset = assets.find((a) =>
    a.name.startsWith(FONT_CONFIG.ASSET_PREFIX) &&
    !FONT_CONFIG.EXCLUDED_VARIANTS.some((variant) => a.name.includes(variant))
  );

  if (!asset) {
    throw new Error(
      `PlemolJP asset not found. Expected asset starting with "${FONT_CONFIG.ASSET_PREFIX}"`,
    );
  }

  return asset;
}

/**
 * Download and extract zip file to temporary directory
 */
async function downloadAndExtractFont(
  asset: GitHubAsset,
): Promise<string> {
  const response = await fetch(asset.browser_download_url);

  if (!response.ok) {
    throw new Error(
      `Failed to download font: ${response.status} ${response.statusText}`,
    );
  }

  const zipData = await response.arrayBuffer();
  const tempDir = await Deno.makeTempDir();
  const zipPath = `${tempDir}/plemoljp.zip`;

  await Deno.writeFile(zipPath, new Uint8Array(zipData));

  const unzipProcess = new Deno.Command("unzip", {
    args: ["-q", zipPath, "-d", tempDir],
  });

  const { success } = await unzipProcess.output();

  if (!success) {
    throw new Error("Failed to unzip font archive");
  }

  return tempDir;
}

/**
 * Recursively find TTF file in directory
 */
async function findTTFFile(dir: string): Promise<string | null> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;

    if (entry.isDirectory) {
      const found = await findTTFFile(path);
      if (found) return found;
    } else if (
      entry.name === FONT_CONFIG.TTF_FILE ||
      (entry.name.endsWith("Regular.ttf") && !entry.name.includes("Console"))
    ) {
      return path;
    }
  }

  return null;
}

/**
 * Convert TTF font to WOFF2 format
 */
async function convertToWOFF2(
  ttfPath: string,
  outputPath: string,
): Promise<void> {
  const ttfData = await Deno.readFile(ttfPath);
  const woff2Data = await wawoff2.compress(ttfData);
  await Deno.writeFile(outputPath, new Uint8Array(woff2Data));
}

/**
 * Download and setup PlemolJP font
 * Automatically downloads the latest version from GitHub if not already present
 */
async function setupPlemolJPFont(): Promise<void> {
  const fontPath = `${FONT_CONFIG.FONTS_DIR}/${FONT_CONFIG.FONT_FILE}`;

  if (await fontExists(fontPath)) {
    console.log("✓ PlemolJP font already exists");
    return;
  }

  console.log("Downloading PlemolJP font...");

  let tempDir: string | null = null;

  try {
    // Fetch release information
    const release = await fetchLatestRelease();
    const asset = findPlemolJPAsset(release.assets);

    console.log(`Downloading ${asset.name} (${release.tag_name})...`);

    // Download and extract
    tempDir = await downloadAndExtractFont(asset);

    // Find TTF file
    const ttfFile = await findTTFFile(tempDir);
    if (!ttfFile) {
      throw new Error(`${FONT_CONFIG.TTF_FILE} not found in archive`);
    }

    // Ensure output directory exists
    await Deno.mkdir(FONT_CONFIG.FONTS_DIR, { recursive: true });

    // Convert to WOFF2
    console.log("Converting to WOFF2 format...");
    await convertToWOFF2(ttfFile, fontPath);

    console.log("✓ PlemolJP font downloaded and optimized");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to setup PlemolJP font: ${message}`);
    throw error;
  } finally {
    // Cleanup temporary directory
    if (tempDir) {
      try {
        await Deno.remove(tempDir, { recursive: true });
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

// Setup font before creating site
await setupPlemolJPFont();

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
    name: "night-owl",
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
