import { profile } from "@/lib/data";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#github", label: "GitHub" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090a]/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-semibold text-white">{profile.name}</a>

        <ul className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-white">{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-300"
        >
          Hire me Fast
        </a>
      </nav>
    </header>
  );
}