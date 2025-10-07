export const layout = "BlogPageLayout.tsx";

export default function* ({ search, paginate, comp }: Lume.Data) {
  const posts = search?.pages ? search.pages() : [];
  const blogPosts = posts.filter((page: any) =>
    page?.url?.toString().startsWith("/blog/") && page?.url !== "/blog.html"
  );

  const allTags = new Set<string>();
  blogPosts.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  for (const tag of allTags) {
    const tagPosts = blogPosts
      .filter((post: any) => post.tags && post.tags.includes(tag))
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date || "1970-01-01");
        const dateB = new Date(b.date || "1970-01-01");
        return dateB.getTime() - dateA.getTime();
      });

    const options = {
      url: (n: number) =>
        n === 1 ? `/tags/${tag}.html` : `/tags/${tag}/page/${n}.html`,
      size: 5,
    };

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
                    <comp.BlogCard
                      url={post.url}
                      title={post.title}
                      date={post.date}
                      description={post.description}
                      tags={post.tags}
                      activeTag={tag}
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
}
