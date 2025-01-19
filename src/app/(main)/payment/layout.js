export default function layout({ children }) {
  return (
    <div className="home-page mt-[150px] mb-[200px] container mx-auto px-4">
      <h1 className="heading-sub">الفوائد</h1>
      {children}
      <button></button>
    </div>
  );
}
