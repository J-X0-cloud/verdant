"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: new FormData(form).get("email") }),
    }).catch(() => undefined);
    if (response?.ok) form.reset();
    setStatus(response?.ok ? "done" : "error");
  }

  return (
    <form className="news" onSubmit={subscribe}>
      <label htmlFor={id}>Get first dibs on new flavors</label>
      <div className="news-row">
        <input
          id={id}
          name="email"
          type="email"
          required
          placeholder="Email address"
          autoComplete="email"
        />
        <button type="submit" className="btn btn-sun" disabled={status === "sending"}>
          Sign up
        </button>
      </div>
      {status === "done" ? (
        <p className="news-msg" role="status">
          You&apos;re in. We&apos;ll email you before the next flavor drops.
        </p>
      ) : status === "error" ? (
        <p className="news-msg" role="alert">
          That didn&apos;t go through. Check the address and try again.
        </p>
      ) : null}
    </form>
  );
}
