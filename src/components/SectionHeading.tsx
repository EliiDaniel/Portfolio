// Small blue label above a big gradient headline, shared by every section.
export default function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-display text-sm font-medium tracking-widest text-accent uppercase">{label}</p>
      <h2 className="mt-4 w-fit bg-gradient-to-r from-accent via-violet-400 to-fuchsia-400 bg-clip-text pb-2 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-tight tracking-tight text-transparent">
        {title}
      </h2>
    </div>
  );
}
