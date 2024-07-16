
export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cyan-500">
      {children}
    </main>
  );
}