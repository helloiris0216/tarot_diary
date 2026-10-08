"use client";

import { useId, useRef, useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input || joined) return;
    const email = input.value.trim();
    input.value = email;
    const [local = "", domain = ""] = email.split("@");
    let message = "";
    if (!email) {
      message = "請先輸入你的電子信箱。";
    } else if (
      input.validity.typeMismatch || email.length > 254 || local.length > 64 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      local.startsWith(".") || local.endsWith(".") || local.includes("..") ||
      domain.split(".").some((label) => !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(label))
    ) {
      message = "請輸入完整的信箱格式，例如 hello@example.com。";
    }
    if (message) {
      setError(message);
      input.focus();
      return;
    }
    setError("");
    setJoined(true);
    // UI preview only: do not send or persist the email address.
    input.value = "";
  }

  return (
    <section className="newsletter" aria-labelledby={`${id}-title`}>
      <div className="newsletter-copy">
        <p className="eyebrow">LET’S STAY IN TOUCH</p>
        <h2 id={`${id}-title`}>下一個溫柔的故事，<br />也想與你分享。</h2>
        <p>想收到新文章與新功能的消息？<br />留下信箱，表達你對未來訂閱通知的興趣。</p>
      </div>
      <div className="newsletter-form-area">
        <form onSubmit={submit} noValidate aria-label="加入訂閱興趣名單">
          <label htmlFor={`${id}-email`}>電子信箱</label>
          <div className="newsletter-fields">
            <input ref={inputRef} id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} placeholder="hello@example.com" disabled={joined} aria-invalid={Boolean(error)} aria-describedby={`${id}-error ${id}-notice`} onInput={() => setError("")} />
            <button type="submit" disabled={joined}>{joined ? "已加入 ✓" : "加入興趣名單 ↗"}</button>
          </div>
          <p id={`${id}-error`} className="newsletter-error" role="alert">{error}</p>
        </form>
        <div className="newsletter-success" role="status" aria-live="polite" aria-atomic="true">
          {joined && <><strong>已加入興趣名單！</strong><p>謝謝你的興趣，期待未來與你分享更多故事。</p></>}
        </div>
        {joined && <button type="button" className="newsletter-reset" onClick={() => {
          setJoined(false);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}>使用其他信箱體驗</button>}
        <p id={`${id}-notice`} className="newsletter-notice">目前開放表單體驗，信箱不會被儲存，暫不寄送通知或驗證信。</p>
      </div>
    </section>
  );
}
