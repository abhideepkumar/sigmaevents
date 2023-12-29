import Login from "@/components/login";
import Event from "@/components/events";
import AllEvents from "@/components/allevents";
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
