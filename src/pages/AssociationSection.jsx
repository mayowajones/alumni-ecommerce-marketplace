import React from "react";
import { Link, useParams } from "react-router-dom";

const pageContent = {
  "our-story": {
    title: "Our Story",
    eyebrow: "The legacy of Command Ojo '98",
    intro:
      "Command Day Secondary School, Ojo gave us a foundation built on discipline, friendship, and ambition. This community continues to celebrate the values we grew up with and the lives we have built since then.",
    stats: [
      { value: "1998", label: "Graduating class" },
      { value: "25+", label: "Years of connection" },
      { value: "100%", label: "Shared memories" },
    ],
    blocks: [
      {
        heading: "Why we stay connected",
        text:
          "From the classroom to the boardroom, we continue to share wins, support each other, and remind one another that the bond formed in Ojo still matters.",
      },
      {
        heading: "What this platform does",
        text:
          "This marketplace and alumni hub is designed to help members reconnect, celebrate milestones, discover opportunities, and buy or sell trusted items within the network.",
      },
    ],
    cta: [
      { label: "Explore marketplace", to: "/products" },
      { label: "Join the alumni network", to: "/register" },
    ],
  },
  "our-community": {
    title: "Our Community",
    eyebrow: "A network that still shows up",
    intro:
      "The strength of our association is in the way members still check in, celebrate milestones, and create opportunities for one another long after school ended.",
    stats: [
      { value: "Daily", label: "Member check-ins" },
      { value: "Monthly", label: "Campus-style events" },
      { value: "One family", label: "Shared identity" },
    ],
    blocks: [
      {
        heading: "What members can do",
        text:
          "Meet up, share career wins, organize charity support, and help one another through business, mentorship, and personal growth.",
      },
      {
        heading: "Why it matters",
        text:
          "A strong alumni network keeps the class vibrant and gives newer members a community they can always call home.",
      },
    ],
    cta: [
      { label: "View community listings", to: "/products" },
      { label: "Register as a member", to: "/register" },
    ],
  },
  birthdays: {
    title: "Birthdays",
    eyebrow: "Celebrate the people who shaped us",
    intro:
      "Birthdays are one of the best reminders that the class remains a living, breathing community. We celebrate progress, gratitude, and the people who still matter to us.",
    stats: [
      { value: "Every month", label: "Birthday shout-outs" },
      { value: "1 class", label: "One love" },
      { value: "Always", label: "A reason to celebrate" },
    ],
    blocks: [
      {
        heading: "Birthday highlights",
        text:
          "Members can announce special dates, receive recognition, and feel connected through a shared memory of school days and the lives they are building now.",
      },
      {
        heading: "Community culture",
        text:
          "This is not just a reminder—it is a celebration of growth, resilience, and the joy of staying connected through every chapter of life.",
      },
    ],
    cta: [
      { label: "Celebrate with the class", to: "/products" },
      { label: "Open the marketplace", to: "/products" },
    ],
  },
  gallery: {
    title: "The Gallery",
    eyebrow: "Snapshots from our journey",
    intro:
      "From classroom memories to reunion smiles, this gallery captures the energy, laughter, and pride that define Command Ojo '98.",
    stats: [
      { value: "Photo stories", label: "Shared memories" },
      { value: "Reunions", label: "Celebrated together" },
      { value: "Forever", label: "In our hearts" },
    ],
    blocks: [
      {
        heading: "Featured moments",
        text:
          "The gallery includes class events, school snapshots, trip memories, and reunion scenes that remind us where we started and where we are now.",
      },
      {
        heading: "Bring the past to life",
        text:
          "Each image helps members reconnect emotionally with the journey that formed the friendships still thriving today.",
      },
    ],
    cta: [
      { label: "View products & keepsakes", to: "/products" },
      { label: "See the full marketplace", to: "/products" },
    ],
  },
  "where-are-they-now": {
    title: "Where Are They Now?",
    eyebrow: "Following the paths after Ojo",
    intro:
      "From business leaders to professionals, creatives, parents, and mentors, the class has continued to make a mark in every field and every corner of the world.",
    stats: [
      { value: "Global", label: "Members reached" },
      { value: "Many paths", label: "Career journeys" },
      { value: "Still united", label: "By one school" },
    ],
    blocks: [
      {
        heading: "Members in motion",
        text:
          "This section tells the stories of members who have moved into entrepreneurship, public service, education, technology, and leadership roles while carrying the same values forward.",
      },
      {
        heading: "Celebrating impact",
        text:
          "By showcasing individual progress, the network encourages current students and alumni to see what is possible when discipline and community work together.",
      },
    ],
    cta: [
      { label: "Explore the marketplace", to: "/products" },
      { label: "Create your profile", to: "/register" },
    ],
  },
  "forms-documents": {
    title: "Forms & Documents",
    eyebrow: "Resources for the class and association",
    intro:
      "Access the forms, records, and official documents that keep the alumni association organized and connected to the right people and events.",
    stats: [
      { value: "Quick access", label: "Forms" },
      { value: "Verified", label: "Association records" },
      { value: "Ready to use", label: "Support tools" },
    ],
    blocks: [
      {
        heading: "Available resources",
        text:
          "This can include reunion registration forms, member update forms, event coordination documents, contribution receipts, and class communication materials.",
      },
      {
        heading: "Designed to help members act fast",
        text:
          "Whether you are registering for an event, updating your contact information, or preparing a class record, the process is made simple and direct.",
      },
    ],
    cta: [
      { label: "Open marketplace", to: "/products" },
      { label: "Sign in / register", to: "/login" },
    ],
  },
  "always-commandos": {
    title: "Always Commandos",
    eyebrow: "Forever in the spirit of Ojo",
    intro:
      "This is the heartbeat of the alumni identity: loyalty, pride, unity, and a commitment to keeping the Command Ojo family connected across generations.",
    stats: [
      { value: "Proud", label: "Forever Commandos" },
      { value: "Strong", label: "School spirit" },
      { value: "One bond", label: "One legacy" },
    ],
    blocks: [
      {
        heading: "Our school pride",
        text:
          "From academic excellence to leadership, service, and friendship, the Command Ojo identity is one that continues to inspire every member.",
      },
      {
        heading: "Our promise",
        text:
          "We keep the spirit alive by remembering where we came from, supporting one another, and creating opportunities that reflect the values we learned together.",
      },
    ],
    cta: [
      { label: "Shop alumni marketplace", to: "/products" },
      { label: "Create an account", to: "/register" },
    ],
  },
};

const AssociationSection = ({ slug: routeSlug }) => {
  const { slug } = useParams();
  const currentSlug = routeSlug || slug || "our-story";
  const content = pageContent[currentSlug] || pageContent["our-story"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-[#0d372d]/10 bg-[#0d372d] shadow-[0_20px_45px_rgba(13,55,45,0.12)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(13,55,45,0.94), rgba(13,55,45,0.72)), url('https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?w=1200&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-6 px-6 py-8 md:px-10 md:py-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#d6a04d]">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl font-bold text-[#f8f5f0] md:text-5xl">{content.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#f2efe9]/80 md:text-lg">
              {content.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {content.cta.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full bg-[#d6a04d] px-5 py-2.5 text-sm font-bold text-[#0d372d] transition hover:bg-[#c69234]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {content.stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.3rem] border border-forest/10 bg-white p-5 shadow-sm">
            <div className="text-3xl font-black text-forest-dark">{stat.value}</div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-dark/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {content.blocks.map((block) => (
          <div key={block.heading} className="rounded-[1.5rem] border border-forest/10 bg-white p-6 shadow-[0_18px_35px_rgba(17,32,24,0.05)]">
            <h2 className="text-2xl font-bold text-forest-dark">{block.heading}</h2>
            <p className="mt-4 text-base leading-8 text-forest-dark/70">{block.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-[#d9a94f]/40 bg-[#f9f1e0] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-dark">Ready to connect?</p>
            <h3 className="mt-2 text-2xl font-bold text-forest-dark">Be part of the next chapter.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white">
              Shop the marketplace
            </Link>
            <Link to="/register" className="rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-bold text-forest-dark">
              Join the association
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociationSection;
