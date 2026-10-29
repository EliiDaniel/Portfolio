import SectionHeading from "@/components/SectionHeading";

type ContactProps = {
  name: string;
  contact: { email: string; linkedin: string; github: string; resume: string };
};

const secondaryButton =
  "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-medium backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(41,151,255,0.35)]";

// Closing call to action with contact links, the resume download, and the site footer.
export default function Contact({ name, contact }: ContactProps) {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 pt-24 pb-12 sm:px-8 md:pt-26">
      <SectionHeading label="Contact" title="Let's build something." />

      <p className="mt-6 max-w-2xl text-balance text-lg text-foreground/80 sm:text-xl">
        Have a project, a question, or just want to say hi? My inbox is always open.
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href={contact.resume}
          download="Eli-Monteroso-Resume.pdf"
          className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-white shadow-[0_0_24px_rgba(41,151,255,0.5)] transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(41,151,255,0.8)]"
        >
          Download Resume ↓
        </a>
        <a href={`mailto:${contact.email}`} className={secondaryButton}>
          Email
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          LinkedIn ↗
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          GitHub ↗
        </a>
      </div>

      <footer className="mt-26 border-t border-white/10 pt-8 text-sm text-muted">© 2026 {name}</footer>
    </section>
  );
}
