import { auth } from "@/auth.config";
import { Title } from "@/components";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <section className="min-h-screen">
      <Title title="Perfil" />
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </section>
  );
}