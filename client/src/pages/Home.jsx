import React from "react";
import { NavLink } from "react-router";
import {
  Search,
  Package,
  Users,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import hero from "../assets/hero.jpeg";

const features = [
  {
    icon: Package,
    title: "Report in seconds",
    description:
      "File a report for a lost or found item with a photo, description, and location in under a minute.",
  },
  {
    icon: Search,
    title: "Smart matching",
    description:
      "Our matching engine pairs lost items with found reports so you can reunite faster.",
  },
  {
    icon: Users,
    title: "Community powered",
    description:
      "Every report is visible to the community, turning every set of eyes into a search party.",
  },
];

const steps = [
  {
    step: "01",
    title: "Report your item",
    description:
      "Describe what you lost or found, upload a photo, and pin the location.",
  },
  {
    step: "02",
    title: "We scan reports",
    description:
      "Lost and found entries are continuously compared for likely matches.",
  },
  {
    step: "03",
    title: "Reconnect & claim",
    description:
      "Get notified on a match, verify the details, and get your item back.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
              <ShieldCheck size={14} className="text-zinc-900" />
              Trusted by your local community
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
              Lost something?{" "}
              <span className="text-zinc-400">Found something?</span>
            </h1>

            <p className="text-base md:text-lg leading-7 text-zinc-500">
              Help reconnect lost items with their owners. Report what you lost
              or what you found — we'll match them and bring them home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/lostit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
              >
                I lost something
                <ArrowRight size={16} />
              </NavLink>
              <NavLink
                to="/foundit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 active:scale-[0.98]"
              >
                I found something
              </NavLink>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-zinc-400" />
                Location based
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-zinc-400" />
                Listed instantly
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-zinc-200/60 blur-2xl" />
            <img
              src={hero}
              alt="Lost and found illustration"
              className="relative w-full rounded-3xl border border-zinc-200 object-cover shadow-xl"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
