export const title = "links";
export const links = [
  {
    text: "Twitter",
    url: "https://twitter.com/no_sea_",
  },
  {
    text: "GitHub",
    url: "https://github.com/yanosea",
  },
];

interface Link {
  text: string;
  url: string;
}

interface PageProps {
  title: string;
  links: Link[];
}

export default ({ title, links }: PageProps) => (
  <article className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
        {title}
      </h1>
    </header>

    <ul className="space-y-4">
      {links.map((link: Link, index: number) => (
        <li
          key={index}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <a
            href={link.url}
            className="text-blue-600 hover:text-purple-700 font-medium text-lg hover:underline transition-colors"
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </article>
);
