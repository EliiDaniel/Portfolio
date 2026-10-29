import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import FadeSection from "@/components/FadeSection";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import { resume } from "@/data/resume";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero name={resume.name} title={resume.title} location={resume.location} />
      <FadeSection>
        <About name={resume.name} photo={resume.photo} summary={resume.summary} />
      </FadeSection>
      <FadeSection>
        <Stats stats={resume.stats} />
      </FadeSection>
      <FadeSection>
        <Experience jobs={resume.experience} />
      </FadeSection>
      <FadeSection>
        <Skills groups={resume.skills} />
      </FadeSection>
      <FadeSection>
        <Projects projects={resume.projects} />
      </FadeSection>
      <FadeSection>
        <Education
          education={resume.education}
          certifications={resume.certifications}
          languages={resume.languages}
        />
      </FadeSection>
      <FadeSection>
        <Contact name={resume.name} contact={resume.contact} />
      </FadeSection>
    </main>
  );
}
