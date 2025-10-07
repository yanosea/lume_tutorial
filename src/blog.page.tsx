export const layout = "BlogPageLayout.tsx";

export default function* ({ comp, search, paginate }: Lume.Data) {
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

  const options = {
    url: (n: number) => n === 1 ? `/blog.html` : `/blog/page/${n}.html`,
    size: 5,
  };

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
            ? (
              <p className="text-muted text-center py-8">
                No posts found.
              </p>
            )
            : (
              <div className="space-y-6">
                {page.results.map((post: any) => (
                  <comp.BlogCard
                    url={post.url}
                    title={post.title}
                    date={post.date}
                    description={post.description}
                    tags={post.tags}
                  />
                ))}
              </div>
            )}

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
