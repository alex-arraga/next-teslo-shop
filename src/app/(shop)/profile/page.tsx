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
      <pre>
        {JSON.stringify(session, null, 2)}
        <h2 className="text-3xl">{session.user.role}</h2>
      </pre>
    </section>
  );
}