import Event from "@/pages/admin/components/events";
import AllEvents from "@/pages/admin/components/allevents";
import Login from "@/pages/admin/components/login";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Login />
      <Event />
      <AllEvents />
    </>
  );
}
