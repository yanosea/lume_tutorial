export const layout = "BaseLayout.tsx";

export default ({ title, children }: Lume.Data) => (
  <main className="card flex-1">
    {children}
  </main>
);
