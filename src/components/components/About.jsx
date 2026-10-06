import React from "react";

/* ---------- Palette ----------
   sand      #EADCC8  page background (light brown)
   parchment #F6EEE2  raised surfaces
   umber     #3B2A1E  primary text
   bark      #6B4F3A  secondary text
   cocoa     #2A1D14  dark feature band
   gold      #C9A227 → #E3BE4F  call-to-action
-------------------------------- */

const games = [
  { icon: "⚡", name: "Tap Rush", line: "Test your speed and reactions." },
  { icon: "🧠", name: "Math Clash", line: "Think fast and make the right moves." },
  { icon: "🎨", name: "Color Switch", line: "Challenge your focus and accuracy." },
  { icon: "💣", name: "Defuse-X", line: "Stay sharp and make the right decisions under pressure." },
];

const boosts = [
  {
    icon: "⚡",
    name: "Normal Boost",
    line: "Increase your leaderboard score using a paid boost.",
  },
  {
    icon: "🔥",
    name: "Super Boost",
    line: "Use your Whipple Points for a more powerful score boost.",
  },
  {
    icon: "🎁",
    name: "Referral Boost",
    line: "Earn boosts through successful referrals and use them when you want to make your games count even more.",
  },
];

const loop = [
  "Play a quick round.",
  "Improve your score.",
  "Climb the leaderboard.",
  "Use a boost when it matters.",
  "Compete for tournament qualification.",
];
const APP_URL = "https://app.mywhipple.com";
const GoldButton = ({ href = APP_URL, children, className = "" }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full
      bg-gradient-to-b from-[#E3BE4F] to-[#C9A227] text-[#2A1D14]
      font-primary font-bold text-base md:text-lg tracking-wide
      shadow-[0_6px_0_#8C6D12,0_12px_24px_rgba(140,109,18,0.35)]
      hover:from-[#EBC85C] hover:to-[#D1AA2F]
      active:translate-y-[3px] active:shadow-[0_3px_0_#8C6D12,0_6px_12px_rgba(140,109,18,0.3)]
      focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A227]/50
      transition-[transform,box-shadow,background] duration-150 ${className}`}
  >
    {children}
  </a>
);

const SectionHeading = ({ icon, title, intro, light = false }) => (
  <div className="max-w-2xl">
    <h2
      className={`font-primary font-bold text-3xl md:text-4xl leading-tight ${
        light ? "text-[#F6EEE2]" : "text-[#3B2A1E]"
      }`}
    >
      <span className="mr-2" aria-hidden="true">{icon}</span>
      {title}
    </h2>
    {intro && (
      <p
        className={`mt-4 text-lg leading-relaxed ${
          light ? "text-[#E6D6BF]" : "text-[#6B4F3A]"
        }`}
      >
        {intro}
      </p>
    )}
  </div>
);

const About = () => {
  

  return (
    <section className="bg-[#EADCC8] text-[#3B2A1E] font-primary overflow-hidden">
      {/* ===== Hero ===== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <p className="text-[#8C6D12] font-semibold text-lg mb-4">
              Got a few seconds? Jump into Whipple Arena.
            </p>
            <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-[#3B2A1E]">
              Whipple Arena
            </h1>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-[#6B4F3A]">
              Quick games. Big competition.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-[#4A3627] max-w-xl">
              Whipple Arena is a free-to-play competitive gaming experience built
              for players who enjoy quick games, instant competition, and the
              challenge of climbing the leaderboard.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#4A3627] max-w-xl">
              Play whenever you have a spare moment. Each game is designed to
              take just 15–60 seconds, so you don't need a long gaming session to
              have fun, compete, and improve.
            </p>
            <div className="mt-10">
              <GoldButton>Start Playing</GoldButton>
            </div>
          </div>

          {/* Round-length panel: the one bold visual moment */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-square rounded-full bg-[#2A1D14] p-6 shadow-[0_30px_60px_rgba(42,29,20,0.35)]">
              <div className="w-full h-full rounded-full border-[10px] border-[#C9A227] flex flex-col items-center justify-center text-center">
                <span className="text-[#E3BE4F] font-bold text-6xl md:text-7xl leading-none">
                  15–60
                </span>
                <span className="mt-2 text-[#F6EEE2] text-xl">seconds a game</span>
                <span className="mt-4 text-[#BFA88A] text-sm max-w-[12rem]">
                  No long sessions. No complicated setup.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Play free ===== */}
      <div className="bg-[#F6EEE2] border-y border-[#D9C6AA]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <SectionHeading
            icon="🎮"
            title="Play free"
            intro="Play free, ultra-short games, climb competitive leaderboards, use boosts, and compete for your place in weekly tournaments. Choose from a growing collection of quick competitive games:"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {games.map((g) => (
              <div
                key={g.name}
                className="rounded-2xl bg-[#EADCC8] p-6 border border-[#D9C6AA]"
              >
                <div className="text-4xl" aria-hidden="true">{g.icon}</div>
                <h3 className="mt-5 text-xl font-bold text-[#3B2A1E]">{g.name}</h3>
                <p className="mt-2 text-[#6B4F3A] leading-relaxed">{g.line}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-lg text-[#4A3627]">
            No long sessions. No complicated setup.{" "}
            <strong className="text-[#3B2A1E]">
              Just pick a game, play, and compete.
            </strong>
          </p>
        </div>
      </div>

      {/* ===== Made for your schedule ===== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <SectionHeading
            icon="⏱️"
            title="Made for your schedule"
            intro="Whether you're taking a short break or simply looking for something quick to do, Whipple Arena lets you enjoy competitive gaming without committing to a long session."
          />
          <div className="space-y-4">
            <div className="flex items-baseline gap-4 border-b border-[#CDB596] pb-4">
              <span className="text-2xl font-bold text-[#8C6D12] w-36 shrink-0">30 seconds</span>
              <span className="text-lg text-[#4A3627]">Play a round.</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-[#CDB596] pb-4">
              <span className="text-2xl font-bold text-[#8C6D12] w-36 shrink-0">A few minutes</span>
              <span className="text-lg text-[#4A3627]">Play several.</span>
            </div>
            <p className="pt-2 text-lg leading-relaxed text-[#6B4F3A]">
              The ultra-short format means you can play more rounds, improve
              your performance, and keep pushing your leaderboard position
              whenever you have the time.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Leaderboards (dark band) ===== */}
      <div className="bg-[#2A1D14]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <SectionHeading
            light
            icon="🏆"
            title="Climb the leaderboards"
            intro="Every game contributes to your competitive journey."
          />
          <p className="mt-6 text-2xl md:text-3xl font-bold text-[#E3BE4F]">
            Play more. Perform better. Climb higher.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-3xl">
            <div className="rounded-2xl border border-[#5A4332] bg-[#3B2A1E] p-6">
              <h3 className="text-xl font-bold text-[#F6EEE2]">Most Frequent</h3>
              <p className="mt-2 text-[#BFA88A]">Ranked by how often you show up and play.</p>
            </div>
            <div className="rounded-2xl border border-[#5A4332] bg-[#3B2A1E] p-6">
              <h3 className="text-xl font-bold text-[#F6EEE2]">Most Wins</h3>
              <p className="mt-2 text-[#BFA88A]">Ranked by how often you come out on top.</p>
            </div>
          </div>
          <p className="mt-8 text-lg text-[#E6D6BF] max-w-2xl leading-relaxed">
            See how you stack up against other Whipple players. And because the
            competition keeps moving, there's always another position to chase.
          </p>
          <div className="mt-10">
            <GoldButton>Start Playing</GoldButton>
          </div>
        </div>
      </div>

      {/* ===== Boosts ===== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <SectionHeading
          icon="⚡"
          title="Boost your score"
          intro="Want to push your leaderboard position further? Whipple Arena gives you different ways to boost your scores:"
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {boosts.map((b, i) => (
            <div
              key={b.name}
              className={`rounded-2xl p-7 border ${
                i === 1
                  ? "bg-[#3B2A1E] border-[#3B2A1E] text-[#F6EEE2]"
                  : "bg-[#F6EEE2] border-[#D9C6AA]"
              }`}
            >
              <div className="text-3xl" aria-hidden="true">{b.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{b.name}</h3>
              <p className={`mt-2 leading-relaxed ${i === 1 ? "text-[#E6D6BF]" : "text-[#6B4F3A]"}`}>
                {b.line}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg text-[#4A3627]">
          Choose when to use your boost and make your competitive moments count.
        </p>
      </div>

      {/* ===== Whipple Points ===== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="rounded-3xl bg-[#F6EEE2] border border-[#D9C6AA] p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="text-6xl" aria-hidden="true">🎁</div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3B2A1E]">
              Play, earn Whipple Points and keep competing
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#6B4F3A]">
              Whipple Arena also gives players opportunities to earn Whipple
              Points through the Arena experience, including eligible rewarded
              activities.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-[#6B4F3A]">
              Your Whipple Points can become part of your wider Whipple journey,
              including access to powerful Super Boosts.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Sunday Night Tournaments ===== */}
      <div className="bg-gradient-to-br from-[#C9A227] to-[#A8841A]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A1D14]">
              <span className="mr-2" aria-hidden="true">🏅</span>
              The best players get another shot
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#3B2A1E]">
              Think you can compete with the best? Keep climbing throughout the
              week. High-performing players on the leaderboards can earn a place
              in Whipple's weekly Sunday Night Tournaments, where top competitors
              face off in a series of games to determine who can rise to the top.
            </p>
          </div>
          <div className="rounded-2xl bg-[#2A1D14] p-8 text-center">
            <p className="text-[#E3BE4F] font-bold text-2xl">Sunday Night Tournaments</p>
            <p className="mt-3 text-[#E6D6BF] leading-relaxed">
              Your performance during the week can become your ticket to the
              tournament.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Quick to play, hard to master ===== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              icon="🔥"
              title="Quick to play. Hard to master."
              intro="Whipple Arena is built around a simple idea: you shouldn't need a long gaming session to have a competitive gaming experience."
            />
          </div>
          {/* This is a genuine sequence, so it's numbered */}
          <ol className="space-y-3">
            {loop.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl bg-[#F6EEE2] border border-[#D9C6AA] px-5 py-4"
              >
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#3B2A1E] text-[#E3BE4F] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-lg text-[#3B2A1E]">{step}</span>
              </li>
            ))}
            <li className="px-5 pt-2 text-lg text-[#6B4F3A]">
              Then come back whenever you're ready for another challenge.
            </li>
          </ol>
        </div>
      </div>

      {/* ===== Closing CTA ===== */}
      <div className="border-t border-[#CDB596]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3B2A1E]">
            Welcome to Whipple Arena.
          </h2>
          <p className="mt-5 text-xl md:text-2xl text-[#6B4F3A]">
            Play quick. Climb higher. Compete for the top.
          </p>
          <div className="mt-10">
            <GoldButton>Start Playing</GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
