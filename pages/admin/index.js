import Event from "@/pages/admin/components/events";
import AllEvents from "@/pages/admin/components/allevents";
import Login from "@/pages/admin/components/login";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

export default function Home() {
  const { data: session } = useSession();
  const adminId=!Cookies.get("admin_id")
  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <Login />
      {session && !adminId && (
        <div>
          <Event />
          <AllEvents />
        </div>
      )}
    </div>
  );
}
