"use client";
import { useState } from "react";
import { profile } from "@/lib/data";

const types = ["Software", "Design", "Automation", "Something else"];

export default function ContactForm() {
  const [type, setType] = useState(types[0]);

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${type} project from ${f.get("name")}`;
    const body = `${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})\nWebsite: ${f.get("website") || "-"}`;
    
    //Think of mailto: as a way to communicate with the operating system's email handler from your browser.
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-white">What do you need built?</p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                type === t
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <textarea name="message" required rows={5} placeholder="Message" className={field} />
      <input name="website" placeholder="Website (optional)" className={field} />

      <button className="rounded-md bg-amber-400 px-5 py-2.5 text-sm font-medium text-black hover:bg-amber-300">
        Send message
      </button>
    </form>
  );
}