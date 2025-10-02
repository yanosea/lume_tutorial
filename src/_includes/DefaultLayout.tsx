export const layout = "BaseLayout.tsx";

export default ({ title, children }: Lume.Data) => (
  <main className="bg-white rounded-lg shadow-lg p-8 flex-1 prose-content">
    {children}
  </main>
);
