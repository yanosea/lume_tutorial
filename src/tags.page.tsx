export const layout = "BlogPageLayout.tsx";

export default function* ({ search, paginate, comp }: Lume.Data) {
  // Get all blog posts
  const posts = search?.pages ? search.pages() : [];
  const blogPosts = posts.filter((page: any) =>
    page?.url?.toString().startsWith("/blog/") && page?.url !== "/blog.html"
  );

  // Collect all tags
  const allTags = new Set<string>();
  blogPosts.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  // Generate pages for each tag (with pagination)
  for (const tag of allTags) {
    const tagPosts = blogPosts
      .filter((post: any) => post.tags && post.tags.includes(tag))
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date || "1970-01-01");
        const dateB = new Date(b.date || "1970-01-01");
        return dateB.getTime() - dateA.getTime();
      });

    // ページネーション設定
    const options = {
      url: (n: number) =>
        n === 1 ? `/tags/${tag}.html` : `/tags/${tag}/page/${n}.html`,
      size: 5, // 5 posts per page
    };

    // Generate content for each page
    for (const page of paginate(tagPosts, options)) {
      yield {
        url: page.url,
        title: `Tag: ${tag}`,
        content: (
          <>
            <h1 className="heading-page">
              Posts tagged "{tag}"
            </h1>

            {page.results.length === 0
              ? (
                <p className="text-muted text-center py-8">
                  No posts found.
                </p>
              )
              : (
                <div className="space-y-6">
                  {page.results.map((post: any) => (
                    <article
                      key={post.url}
                      className="card-article"
                    >
                      <h2 className="text-2xl font-semibold mb-2">
                        <a
                          href={post.url}
                          className="link-primary"
                        >
                          {post.title}
                        </a>
                      </h2>

                      {post.date && (
                        <time className="text-muted text-sm">
                          {new Date(post.date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).replace(/\//g, "/")}
                        </time>
                      )}

                      {post.description && (
                        <p className="text-secondary mt-3">
                          {post.description}
                        </p>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((postTag: string) => (
                            <a
                              key={postTag}
                              href={`/tags/${postTag}.html`}
                              className={postTag === tag ? "tag-active" : "tag"}
                            >
                              {postTag}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

            {/* Pagination navigation */}
            {page.pagination.totalPages > 1 && (
              <comp.pagination
                previousUrl={page.pagination.previous}
                nextUrl={page.pagination.next}
              />
            )}
          </>
        ),
      };
    }
  }
}
