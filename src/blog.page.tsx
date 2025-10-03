export const layout = "BlogPageLayout.tsx";

export default function* ({ comp, search, paginate }: Lume.Data) {
  // Get posts from blog directory and sort by date
  const posts = search?.pages ? search.pages() : [];

  const blogPosts = posts
    .filter((page: any) => {
      return page?.url?.toString().startsWith("/blog/") &&
        page?.url !== "/blog.html";
    })
    .sort((a: any, b: any) => {
      const dateA = new Date(a.date || "1970-01-01");
      const dateB = new Date(b.date || "1970-01-01");
      return dateB.getTime() - dateA.getTime();
    });

  // paginattion
  const options = {
    url: (n: number) => n === 1 ? `/blog.html` : `/blog/page/${n}.html`,
    size: 5, // 5 posts per page
  };

  // Generate content for each page
  for (const page of paginate(blogPosts, options)) {
    yield {
      url: page.url,
      title: "Blog",
      content: (
        <>
          <h1 className="heading-page">
            Blog Posts
          </h1>

          {page.results.length === 0
            ? <p className="text-muted text-center py-8">No posts yet.</p>
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
                      <p className="text-secondary mt-3">{post.description}</p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag: string) => (
                          <a
                            key={tag}
                            href={`/tags/${tag}.html`}
                            className="tag"
                          >
                            {tag}
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
