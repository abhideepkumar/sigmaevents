import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className=" bg-gray-100">
      <header className="bg-indigo-600 text-white">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Sigma Events</h1>
        </div>
      </header>
      <section className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src="/home_image.jpg"
              alt="Welcome Image"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Sigma Events!
            </h2>
            {session ? (
              <p className="text-gray-800">
                You are logged in as{" "}
                <span className="text-red-600">{session.user.email}</span> .
                View your profile{" "}
                <Link href="/setting" className="text-red-600">
                  here
                </Link>
              </p>
            ) : (
              <p className="text-gray-800">
                Login to create or view your profile.
              </p>
            )}
          </div>
        </div>
      </section>
      <footer className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Sigma Events. Some rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
