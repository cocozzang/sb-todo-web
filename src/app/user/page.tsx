import { getUser } from "./actions/get-user";
import { redirect } from "next/navigation";
import { UserCard } from "./components/user-card";

export default async function UserPage() {
  const res = await getUser();

  if (res.status === 401 || !res.data) redirect("/login");

  const user = res.data;

  return (
    <main className="container mx-auto py-10">
      <section>
        <UserCard user={user} />
      </section>
    </main>
  );
}
