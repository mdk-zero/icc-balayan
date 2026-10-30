"use client";

import { useState, type FormEvent } from "react";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  /** Take the full row on wide screens. */
  wide?: boolean;
};

/**
 * Composes an email in the visitor's own mail app. There is no server behind
 * the site yet, so nothing is sent from the page itself.
 *
 * `subject` may name fields in braces, e.g. "{topic}: {name}".
 */
export function MailtoForm({
  to,
  subject,
  fields,
  submitLabel,
}: {
  to: string;
  subject: string;
  fields: FormField[];
  submitLabel: string;
}) {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const subjectLine = subject.replace(/\{(\w+)\}/g, (_, name: string) => value(name));
    const details = fields
      .filter((field) => field.type !== "textarea" && value(field.name))
      .map((field) => `${field.label}: ${value(field.name)}`);
    const notes = fields
      .filter((field) => field.type === "textarea" && value(field.name))
      .map((field) => value(field.name));
    const body = [...notes, details.join("\n")].join("\n\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subjectLine,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
      {fields.map((field) => {
        const optional = field.required ? null : (
          <span className="font-[400] text-slate-soft"> (optional)</span>
        );
        const span = field.wide || field.type === "textarea" ? "sm:col-span-2" : "";
        return (
          <label key={field.name} className={`block ${span}`}>
            <span className="field-label">
              {field.label}
              {optional}
            </span>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                rows={6}
                className="field resize-y leading-relaxed"
              />
            ) : field.type === "select" ? (
              <select name={field.name} required={field.required} defaultValue="" className="field">
                <option value="" disabled>
                  Choose one
                </option>
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                className="field"
              />
            )}
          </label>
        );
      })}

      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        <button type="submit" className="btn">
          {submitLabel}
        </button>
        <p className="type-small text-slate-soft">
          This opens your email app with the message filled in, ready to send to {to}.
        </p>
        <p role="status" aria-live="polite" className="type-ui text-royal">
          {opened
            ? `If your email app didn't open, write to ${to} directly.`
            : ""}
        </p>
      </div>
    </form>
  );
}
