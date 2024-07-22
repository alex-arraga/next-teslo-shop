import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="px-4 sm:mx-10">
        {children}
      </div>

      <Footer />
    </main>
  );
}