import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Fetch the user session using next-auth
  const { data: session } = useSession();

  return (
    <main className="theme w-full dark:bg-slate-800">
      <section className="container py-8 px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Display a welcome image */}
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
          {/* Display welcome message and profile link */}
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Welcome to Sigma Events!</h2>
            {/* Check if the user is logged in */}
            {session ? (
              // If logged in, display user's email and profile link
              <p className="text-gray-800 ">
                <span className=" dark:text-white"> You are logged in as</span> <span className="text-red-600">{session.user.email}</span><span className="dark:text-white" >.View your profile{" "}</span>
                <Link href="/setting" className="text-red-600">
                  here
                </Link>
              </p>
            ) : (
              // If not logged in, prompt to login
              <p className="text-red-600">Login to create or view your profile.</p>
            )}
          </div>
        </div>
      </section>
      {/* Display footer */}
      <footer className="bg-green-300 py-4 dark:bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="dark:text-green-300">&copy; {new Date().getFullYear()} Sigma Events. Some rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
