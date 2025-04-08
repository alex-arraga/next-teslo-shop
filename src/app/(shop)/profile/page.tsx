import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { Title } from "@/components";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/')
  }

  return (
    <section className="min-h-screen">
      <Title title="Perfil" />

      <div className="bg-white dark:bg-neutral-900 p-2 sm:p-4 xl:p-6 rounded-lg max-w-xl">
        <h2 className="mb-4 font-medium text-sm md:text-lg">User data</h2>
        <pre className="text-blue-900 dark:text-blue-100 text-xs sm:text-sm md:text-base">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

    </section>
  );
}