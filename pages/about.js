import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTAButton from "@/components/CTAButton";

export default function About() {
    const { data: session } = useSession();


    return (
        <main className="theme w-full dark:bg-slate-800">
            {/* HERO WELCOME SECTION */}
            <section className="py-8 px-12 ">

                <div className="flex flex-col md:flex-row gap-6 items-stretch justify-between dark:text-white">
                    <div className="md:w-1/2 flex flex-col items-start text-left justify-center">
                        <h1 className="text-4xl font-bold">Welcome to Sigma Events</h1>
                        <h2 className="text-2xl">Stress-free student events management</h2>
                        <p>At Sigma Events, we believe in the power of hassle-free moments.<br />
                        Join us on a journey where event management is effortless, and participation is a joy. From students to clubs, we&apos;re here to make every event memorable. Let&apos;s turn your ideas into unforgettable experiences!
                        </p>
                        <CTAButton text="Start Now" href="#" large/>
                    </div>
                    <div className="md:w-1/2 flex flex-col items-center justify-center">
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

                </div>

            </section>

            {/* OUR MISSION */}
            <section className="py-8 px-16 text-center flex flex-col items-center  dark:text-white ">
                <h1 className="text-3xl font-semibold mb-2">Our Mission</h1>
                <p className="w-3/4">
                    At Sigma Events, our mission is clear and passionate: to empower students and clubs by revolutionizing the way events are organized and experienced. We are committed to providing a platform that takes the complexity out of event management, allowing you to focus on what truly matters - creating memorable moments.
                </p>
            </section>

            {/* WHY SIGMA EVENTS? */}
            <section className="py-8 px-16">
                <div className="flex flex-col md:flex-row gap-6 items-stretch justify-between">
                    <div className="md:w-1/2 flex flex-col items-start text-left justify-center">
                        <h1 className="text-3xl font-semibold mb-2  dark:text-white">Why Sigma?</h1>
                        <p className="text-lg  dark:text-white">At Sigma Events, we&apos;re on a mission to transform the event experience for students and clubs. Our approach is simple yet powerful - we embrace innovation to provide a seamless and user-friendly platform that empowers you to create, organize, and participate in events with unparalleled ease.</p>
                        <CTAButton text="Start Now" href="#" />
                    </div>

                    <div className="md:w-1/2 flex flex-col items-center text-left justify-center gap-2">
                        <div className="w-full bg-white
                        p-4 rounded-md">
                            <h3 className="font-bold">1. Hassle-free Experiences</h3>
                            <p>Streamline event coordination and simplify logistics effortlessly.</p>
                        </div>
                        
                        <div className="w-full bg-white
                        p-4 rounded-md">
                            <h3 className="font-bold">2. Inclusive Participation</h3>
                            <p>Ensure events are accessible to all, and easily foster a sense of community.</p>
                        </div>

                        <div className="w-full bg-white
                        p-4 rounded-md">
                            <h3 className="font-bold">3. Tech-Driven Solutions</h3>
                            <p>Utilise advanced technology for efficient management to drive traffic to your events.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <VerticalTimeline
                lineColor="#6EE7B7"
            >
                <VerticalTimelineElement
                    contentStyle={{ background: 'rgb(38, 153, 117)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(38, 153, 117)' }}
                    iconStyle={{ background: '#6EE7B7', color: '#fff' }}
                >
                    <h3 className="text-2xl font-bold vertical-timeline-element-title">Founding Inspiration</h3>
                    <p>
                    In the early days, our founders faced the familiar hurdles of event coordination. Fueled by the desire to make a meaningful impact, they embarked on a journey to create a platform that would simplify the entire process. The idea was simple - make event planning and participation hassle-free for all with an elegant software solution.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    contentStyle={{ background: 'rgb(38, 153, 117)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(38, 153, 117)' }}
                    iconStyle={{ background: '#6EE7B7', color: '#fff' }}
                >
                    <h3 className="text-2xl font-bold vertical-timeline-element-title">Challenges</h3>
                    <p>
                    Building the Sigma Events platform has been an eye-opening process with unique challenges, but we are committed to working closely with users to forge the platform into exactly what they need.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    contentStyle={{ background: 'rgb(38, 153, 117)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(38, 153, 117)' }}
                    iconStyle={{ background: '#6EE7B7', color: '#fff' }}
                >
                    <h3 className="text-2xl font-bold vertical-timeline-element-title">Continuous Improvement</h3>
                    <p>
                    Our journey is only just beginning, and we remain committed to continually improving the service Sigma Events offers. We see Sigma Events as not just a platform, but a living, breathing entity that evolves with the ever-changing landscape of student life.<br /><br />
                    Join us in celebrating our story - one which is still unfolding, with new chapters being written by every single event, club, and student who finds joy and ease in the Sigma Events experience.
                    </p>
                    <CTAButton text="Start Now" href="#" />
                </VerticalTimelineElement>
            </VerticalTimeline>

            {/* Display footer */}
            <footer className="bg-emerald-300 py-4">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Sigma Events. Some rights reserved.</p>
            </div>
            </footer>
        </main>
    );
}