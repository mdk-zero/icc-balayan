"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const topics = [
  "Admissions",
  "Academics and programmes",
  "Registrar and records",
  "Alumni",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = `${topic} — ${name}`;
    const body = `${message}\n\n${name}\n${email}${phone ? `\n${phone}` : ""}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should now be open with the message ready to send.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="label text-muted">Full name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border-b border-rule bg-transparent py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="label text-muted">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border-b border-rule bg-transparent py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="label text-muted">Phone (optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 w-full border-b border-rule bg-transparent py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="label text-muted">What is this about?</span>
          <select
            name="topic"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-rule bg-transparent py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold"
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="label text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border-b border-rule bg-transparent py-2.5 text-[0.95rem] leading-relaxed text-ink outline-none transition-colors focus:border-gold"
        />
      </label>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
        >
          Write the message
        </button>
        <p className="text-xs text-muted">
          This opens your email app. Nothing is sent from this page.
        </p>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-blue-mid">
        {status}
      </p>
    </form>
  );
}
