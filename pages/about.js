import React from "react";
import Image from "next/image";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTAButton from "@/components/CTAButton";

export default function About() {
    return (
        <main className="dark bg-slate-900 text-white">
            {/* HERO WELCOME SECTION */}
            <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Welcome to Sigma Events</h1>
                        <p className="text-lg text-slate-400 mb-8">
                        At Sigma Events, we believe in the power of hassle-free moments. Join us on a journey where event management is effortless, and participation is a joy.
                        </p>
                        <CTAButton text="Get Started" href="#" large primary/>
                    </div>
                    <div className="order-first md:order-last">
                        <Image
                            src="https://source.unsplash.com/random/800x600/?community,students"
                            alt="Community"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-2xl shadow-slate-950"
                        />
                    </div>
                </div>
            </section>

            {/* OUR MISSION */}
            <section className="py-16 md:py-24 bg-slate-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-slate-400 text-lg">
                        At Sigma Events, our mission is clear and passionate: to empower students and clubs by revolutionizing the way events are organized and experienced. We are committed to providing a platform that takes the complexity out of event management, allowing you to focus on what truly matters - creating memorable moments.
                    </p>
                </div>
            </section>

            {/* WHY SIGMA EVENTS? */}
            <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Why Sigma?</h2>
                        <p className="text-lg text-slate-400 mb-8">At Sigma Events, we&apos;re on a mission to transform the event experience for students and clubs. Our approach is simple yet powerful - we embrace innovation to provide a seamless and user-friendly platform that empowers you to create, organize, and participate in events with unparalleled ease.</p>
                        <CTAButton text="Start Now" href="#" large primary/>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800 p-6 rounded-xl">
                            <h3 className="font-bold text-xl mb-2 text-emerald-400">1. Hassle-free Experiences</h3>
                            <p className="text-slate-400">Streamline event coordination and simplify logistics effortlessly.</p>
                        </div>
                        
                        <div className="bg-slate-800 p-6 rounded-xl">
                            <h3 className="font-bold text-xl mb-2 text-emerald-400">2. Inclusive Participation</h3>
                            <p className="text-slate-400">Ensure events are accessible to all, and easily foster a sense of community.</p>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl">
                            <h3 className="font-bold text-xl mb-2 text-emerald-400">3. Tech-Driven Solutions</h3>
                            <p className="text-slate-400">Utilise advanced technology for efficient management to drive traffic to your events.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-16 md:py-24">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Story</h2>
                <VerticalTimeline lineColor="rgb(51 65 85)">
                    <VerticalTimelineElement
                        contentStyle={{ background: 'rgb(30 41 59)', color: '#fff', boxShadow: 'none' }}
                        contentArrowStyle={{ borderRight: '7px solid rgb(30 41 59)' }}
                        iconStyle={{ background: 'rgb(16 185 129)', color: '#fff' }}
                    >
                        <h3 className="text-xl font-bold text-emerald-400">Founding Inspiration</h3>
                        <p className="!font-normal text-slate-400">
                        In the early days, our founders faced the familiar hurdles of event coordination. Fueled by the desire to make a meaningful impact, they embarked on a journey to create a platform that would simplify the entire process.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        contentStyle={{ background: 'rgb(30 41 59)', color: '#fff', boxShadow: 'none' }}
                        contentArrowStyle={{ borderRight: '7px solid rgb(30 41 59)' }}
                        iconStyle={{ background: 'rgb(16 185 129)', color: '#fff' }}
                    >
                        <h3 className="text-xl font-bold text-emerald-400">Challenges</h3>
                        <p className="!font-normal text-slate-400">
                        Building the Sigma Events platform has been an eye-opening process with unique challenges, but we are committed to working closely with users to forge the platform into exactly what they need.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        contentStyle={{ background: 'rgb(30 41 59)', color: '#fff', boxShadow: 'none' }}
                        contentArrowStyle={{ borderRight: '7px solid rgb(30 41 59)' }}
                        iconStyle={{ background: 'rgb(16 185 129)', color: '#fff' }}
                    >
                        <h3 className="text-xl font-bold text-emerald-400">Continuous Improvement</h3>
                        <p className="!font-normal text-slate-400">
                        Our journey is only just beginning, and we remain committed to continually improving the service Sigma Events offers. Join us in celebrating our story - one which is still unfolding.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </section>

            <footer className="text-center py-10 text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} SigmaEvents. All rights reserved.</p>
                <p>Modern UI for College Club Events</p>
            </footer>
        </main>
    );
}