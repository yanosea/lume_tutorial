export const layout = "BaseLayout.tsx";

export default ({ title, children }: Lume.Data) => (
  <div className="card flex-1 prose-content flex flex-col justify-center">
    {children}
  </div>
);
