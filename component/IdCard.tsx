import Image from "next/image";
import { profile } from "@/lib/data";

export default function IdCard() {
  return (
    // Clips the top (so the card drops in from "off screen") but lets the swing show on the sides
    <div className="relative mx-auto h-[540px] w-[300px] [clip-path:inset(0_-200px_-60px_-200px)]">
      <div className="id-drop">
        {/* Everything below swings from the top center */}
        <div className="id-swing flex flex-col items-center">
          {/* Lanyard strap */}
          <div className="h-32 w-8 bg-gradient-to-b from-amber-500 to-amber-400 shadow-md" />

          {/* Metal clip */}
          <div className="-mt-px h-7 w-10 rounded-b-md bg-gradient-to-b from-zinc-300 to-zinc-500" />
          <div className="-mt-1 h-3 w-4 rounded-b bg-zinc-600" />

          {/* The card */}
          <div className="relative w-60 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-800 to-zinc-950 p-5 shadow-2xl shadow-black/60">
            {/* Card slot */}
            <div className="mx-auto mb-4 h-2 w-14 rounded-full bg-black/70 ring-1 ring-white/10" />

            {/* Photo */}
            <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-xl border-2 border-amber-400/80 bg-zinc-700">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-white">{profile.name}</p>
              <p className="text-xs uppercase tracking-widest text-amber-400">{profile.role}</p>
              <p className="mt-1 text-xs text-zinc-400">{profile.city}</p>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span>ID 0001</span>
              <span>Dob : {profile.dob}</span>
            </div>

            {/* Barcode */}
            <div
              className="mt-2 h-8 w-full opacity-80"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#e4e4e7 0 2px,transparent 2px 4px,#e4e4e7 4px 5px,transparent 5px 9px)",
              }}
            />

            {/* Shine */}
            <span className="id-shine pointer-events-none absolute inset-y-0 left-0 w-10 bg-white/10 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}