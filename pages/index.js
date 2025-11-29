import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

export default function Home() {
  // Fetch the user session using next-auth
  const { data: session } = useSession();

  return (
    <main className="dark bg-slate-900">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Discover & Manage College Events
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              The ultimate platform for students to find exciting events and for clubs to manage them effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <CTAButton text="Browse Events" href="/events" large primary />
              <CTAButton text="Learn More" href="/about" large />
            </div>
            {session && (
                <p className="text-slate-400 mt-8 text-sm">
                  Logged in as <span className="font-semibold text-emerald-400">{session.user.email}</span>. 
                  Go to <Link href="/setting" className="underline hover:text-white">Settings</Link>.
                </p>
              )}
          </div>
          <div className="hidden md:block">
            <Image
              src="https://source.unsplash.com/random/800x600/?technology,event"
              alt="Tech event"
              width={800}
              height={600}
              className="rounded-xl shadow-2xl shadow-slate-950"
              priority={true}
            />
          </div>
        </div>
      </section>
      <footer className="text-center py-10 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SigmaEvents. All rights reserved.</p>
          <p>Modern UI for College Club Events</p>
      </footer>
    </main>
  );
}
