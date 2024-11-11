"use client";

import { UserCard } from "./components/user-card";

const UserPage = () => {
  return (
    <main className="container mx-auto py-10">
      <section>
        <UserCard />
      </section>
    </main>
  );
};

export default UserPage;
