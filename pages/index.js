import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="theme w-full">
      <section className="container py-8 px-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Image
              src="https://source.unsplash.com/collection/8317102/480x360"
              loader={() => "https://source.unsplash.com/collection/8317102/480x360"}
              alt="Welcome Image"
              width={500}
              height={500}
              className="rounded-lg"
              priority={true} 
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Welcome to Sigma Events!</h2>
            {session ? (
              <p className="text-gray-800">
                You are logged in as <span className="text-red-600">{session.user.email}</span>. View your profile{" "}
                <Link href="/setting" className="text-red-600">
                  here
                </Link>
              </p>
            ) : (
              <p className="text-gray-800">Login to create or view your profile.</p>
            )}
          </div>
        </div>
      </section>
      <footer className="bg-emerald-300 py-4">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Sigma Events. Some rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
