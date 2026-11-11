import Image from "next/image";
import { profile, services, projects, skills } from "@/lib/data";
import Clock from "./Clock";
import ContactForm from "./ContactForm";
import IdCard from "./IdCard";

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl text-zinc-400">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-8 overflow-x-clip px-4 pb-10 sm:px-6 md:grid-cols-2"
    >
      <div className="pt-16 md:pt-0">
        <p className="text-zinc-400">Hi, I’m</p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          I’m a <strong className="text-white">{profile.role}</strong> in{" "}
          {profile.city} with{" "}
          <strong className="text-white">
            {profile.years} years of experience
          </strong>
          . {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-md bg-amber-400 px-5 py-2.5 text-sm font-medium text-black hover:bg-amber-300"
          >
            Hire me
          </a>
          <a
            href="#work"
            className="rounded-md border border-white/15 px-5 py-2.5 text-sm text-white hover:bg-white/5"
          >
            See my work
          </a>
        </div>
        <p className="mt-10 flex items-center gap-2 text-sm text-zinc-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <Clock timeZone={profile.timeZone}/>in {profile.city}(IST) · Taking on
          freelance projects
        </p>
      </div>
      <IdCard/>
    </section>
  );
}

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I can build for you"
      intro="Pick one, or bring me something that needs all of them."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
          >
            <p className="font-mono text-xs text-zinc-500">{s.stack}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Things I’ve built"
      intro="Open the live ones and look around."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
          >
            {p.image ? (
              <Image
                src={p.image}
                alt={p.title}
                width={1200}
                height={750}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
            )}
            <div className="p-6">
              <p className="text-xs font-medium text-amber-400">{p.tag}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{p.tagline}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-white underline decoration-amber-400 underline-offset-4"
              >
                {p.cta} ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Expertise() {
  return (
    <Section id="expertise" eyebrow="Expertise" title="What I build with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="text-sm font-semibold text-white">{g.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li
                  key={i}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

type Repo = {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      next: { revalidate: 3600 },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function GitHub() {
  const user = await gh<{ public_repos: number; created_at: string }>(
    `/users/${profile.githubUser}`,
  );
  const repos =
    (await gh<Repo[]>(
      `/users/${profile.githubUser}/repos?sort=pushed&per_page=6`,
    )) ?? [];

  return (
    <Section id="github" eyebrow="GitHub" title="Recently pushed repositories">
      {user && (
        <p className="mb-6 text-sm text-zinc-400">
          {user.public_repos} public repositories · on GitHub since{" "}
          {new Date(user.created_at).getFullYear()}
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <li key={r.id}>
            <a
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
            >
              <p className="truncate font-medium text-white">{r.name}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {r.language ?? "—"} ·{" "}
                {new Date(r.pushed_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={`https://github.com/${profile.githubUser}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-white underline decoration-amber-400 underline-offset-4"
      >
        Open GitHub profile ↗
      </a>
    </Section>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Got something to build? Write to me"
      intro="Tell me what it is and roughly when you need it. Send a link or a sketch if you have one."
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <dl className="space-y-5 text-sm">
          <div>
            <dt className="text-zinc-500">Email</dt>
            <dd>
              <a
                href={`mailto:${profile.email}`}
                className="text-white hover:text-amber-300"
              >
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">LinkedIn</dt>
            <dd>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300"
              >
                {profile.name}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">GitHub</dt>
            <dd>
              <a
                href={`https://github.com/${profile.githubUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300"
              >
                {profile.githubUser}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Time zone</dt>
            <dd className="text-white">{profile.city}</dd>
          </div>
        </dl>
        <ContactForm />
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm text-zinc-500 sm:px-6">
        <p>
            <span>
                {profile.name}, {profile.city}(IST)
            </span> 
        </p>
        <a href="#top" className="hover:text-white">
          Back to top
        </a>
      </div>
    </footer>
  );
}
