"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { personalData } from "@/utils/data/personal-data";

// Dynamically import components with SSR disabled
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), { ssr: false });
const AboutSection = dynamic(() => import("./components/homepage/about"), { ssr: false });
const Experience = dynamic(() => import("./components/homepage/experience"), { ssr: false });
const Skills = dynamic(() => import("./components/homepage/skills"), { ssr: false });
const Projects = dynamic(() => import("./components/homepage/projects"), { ssr: false });
const ContactSection = dynamic(() => import("./components/homepage/contact"), { ssr: false });
const Education = dynamic(() => import("./components/homepage/education"), { ssr: false });
const Blog = dynamic(() => import("./components/homepage/blog"), { ssr: false });

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
        setBlogs(filtered);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog />
      <ContactSection />
    </>
  );
}