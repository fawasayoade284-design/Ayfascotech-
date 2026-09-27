import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayfasco — Ayoade Fawas Ayomide | Artist, Developer & Builder",
  description:
    "Official profile of Ayoade Fawas Ayomide, professionally known as Ayfasco — a Nigerian music artist, software developer, builder and Building Technology student at Osun State University.",
  keywords: [
    "Ayfasco",
    "Ayoade Fawas Ayomide",
    "Ayfasco developer",
    "Ayfasco artist",
    "Ayfasco music",
    "Ayfasco developer Nigeria",
    "Ayfascotech",
    "Building Technology",
    "Osun State University",
  ],
  alternates: {
    canonical: "/ayfasco",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Ayfasco — Ayoade Fawas Ayomide",
  description:
    "Official profile of Ayoade Fawas Ayomide, professionally known as Ayfasco.",
  mainEntity: {
    "@type": "Person",
    name: "Ayoade Fawas Ayomide",
    alternateName: "Ayfasco",
    description:
      "Nigerian multidisciplinary creator, music artist and producer, software developer, builder and Building Technology student.",
    birthDate: "--04-24",
    sameAs: [
      "https://audiomack.com/ayfasco",
      "https://www.tiktok.com/@ayfascoyen",
      "https://www.instagram.com/ayfasco1",
      "https://github.com/fawasayoade284",
      "https://www.youtube.com/@Ayfasco1",
    ],
  },
};

export default function AyfascoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Official Profile
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Ayoade Fawas Ayomide
          </h1>

          <p className="mt-5 text-2xl font-semibold text-emerald-400">
            Professionally known as Ayfasco
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Nigerian multidisciplinary creator working across music,
            software development, building technology and digital innovation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-700 px-4 py-2">
              🎵 Music Artist
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              💻 Software Developer
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              🏗️ Builder
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              🚀 Creator
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold">About Ayfasco</h2>
          </div>

          <div className="space-y-5 text-slate-300 leading-8 md:col-span-2">
            <p>
              <strong className="text-white">Ayoade Fawas Ayomide</strong>,
              professionally known as <strong className="text-white">Ayfasco</strong>,
              is a Nigerian multidisciplinary creator whose interests and work
              span music, software development, building technology and
              digital innovation.
            </p>

            <p>
              He was born on <strong className="text-white">April 24</strong>
              and is currently <strong className="text-white">18 years old</strong>.
            </p>

            <p>
              Ayfasco grew up around{" "}
              <strong className="text-white">
                Ilepa and Sango-Ota, Ogun State
              </strong>
              , and has roots in{" "}
              <strong className="text-white">
                Abeokuta, Ogun State, Nigeria
              </strong>
              .
            </p>

            <p>
              As of 2026, he is a{" "}
              <strong className="text-white">
                200-level B.Sc. Building Technology student at Osun State
                University, Osogbo
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Music
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Music Artist & Producer
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            Ayfasco is an independent Nigerian music artist and producer.
            Music is one of the central parts of his creative identity, with
            releases and artist activity available through his public music
            profiles.
          </p>

          <a
            href="https://audiomack.com/ayfasco"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-slate-950"
          >
            Listen on Audiomack →
          </a>
        </div>
      </section>

      {/* DEVELOPMENT */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Technology
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Software Developer & Digital Creator
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            Ayfasco develops digital products and explores web development,
            artificial intelligence, automation and technology-driven
            solutions. He builds projects with a focus on solving practical
            problems and creating useful digital experiences.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold">Ayfascotech</h3>
              <p className="mt-3 text-slate-400">
                A technology initiative focused on websites, software and
                digital solutions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold">Digital Projects</h3>
              <p className="mt-3 text-slate-400">
                Independent projects exploring AI, student technology,
                automation and online platforms.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/fawasayoade284"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-xl border border-slate-700 px-5 py-3 font-semibold"
          >
            View GitHub →
          </a>
        </div>
      </section>

      {/* BUILDING */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Built Environment
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Building Technology & Construction
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            Ayfasco studies Building Technology and has interests in
            construction, BIM, digital construction, smart buildings,
            automation and the intersection of technology with the built
            environment.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Projects
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Building Ideas Into Projects
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Ayfascotech", "Web development and digital technology."],
              ["Campuz", "A student-focused digital platform concept."],
              ["Ayfasco AI", "An experimental AI-powered digital project."],
              ["Perkora", "An independent digital rewards platform concept."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 p-6"
              >
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">Family</h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Ayfasco is the son of Mr. Ayoade and Mrs. Ayoade and has two
            younger brothers, Hawal Ayoade and Abdulsalam Ayoade.
          </p>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">Official Profiles</h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ["Audiomack", "https://audiomack.com/ayfasco"],
              ["TikTok", "https://www.tiktok.com/@ayfascoyen"],
              ["Instagram", "https://www.instagram.com/ayfasco1"],
              ["GitHub", "https://github.com/fawasayoade284"],
              ["YouTube", "https://www.youtube.com/@Ayfasco1"],
            ].map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-700 px-5 py-3 hover:border-emerald-400"
              >
                {name} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Ayfasco. Official profile.
        </div>
      </footer>
    </main>
  );
}
