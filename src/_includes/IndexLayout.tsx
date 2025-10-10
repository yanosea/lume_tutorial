export const layout = "BaseLayout.tsx";

export default ({ title, children, comp }: Lume.Data) => (
  <div className="flex-1 flex flex-col justify-center gap-6">
    <div className="card prose-content">
      {children}
    </div>
    <comp.SpotifyStatus />
  </div>
);
