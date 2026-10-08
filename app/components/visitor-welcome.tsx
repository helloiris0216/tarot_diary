"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const STORAGE_KEY = "iris-visitor-name";
const MAX_NAME_LENGTH = 24;

export default function VisitorWelcome() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [storageNotice, setStorageNotice] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);

  function showPrompt() {
    if (!dialogRef.current || dialogRef.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current.showModal();
    inputRef.current?.focus();
  }

  useEffect(() => {
    // Read browser-only storage after hydration; keep server markup consistent.
    const frame = requestAnimationFrame(() => {
      let savedName = "";
      try {
        savedName = localStorage.getItem(STORAGE_KEY)?.trim().slice(0, MAX_NAME_LENGTH) ?? "";
      } catch {
        setStorageNotice("此瀏覽器無法儲存稱呼，本次瀏覽仍可使用。");
      }
      if (savedName) {
        setName(savedName);
        if (inputRef.current) inputRef.current.value = savedName;
      } else {
        showPrompt();
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
    };
  }, []);

  function handleClose() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    editRef.current?.focus();
  }

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = inputRef.current?.value.trim().slice(0, MAX_NAME_LENGTH) ?? "";
    if (!nextName) {
      setError("請輸入你的稱呼，不能只填空白。");
      inputRef.current?.focus();
      return;
    }
    setError("");
    setName(nextName);
    try {
      localStorage.setItem(STORAGE_KEY, nextName);
      setStorageNotice("");
    } catch {
      setStorageNotice("稱呼僅在本次瀏覽保留。");
    }
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="visitor-bar">
        <div className="shell visitor-bar-inner">
          <p role="status"><span aria-hidden="true">✧</span> {name ? <>歡迎，<strong>{name}</strong>。留一點溫柔的時間給自己。</> : "歡迎來到 Iris Space，今天也好好陪伴自己。"}</p>
          <button ref={editRef} type="button" onClick={() => {
            setError("");
            if (inputRef.current) inputRef.current.value = name;
            showPrompt();
          }}>{name ? "修改稱呼" : "告訴我你的稱呼"}</button>
          {storageNotice && <small className="visitor-storage-note">{storageNotice}</small>}
        </div>
      </div>
      <dialog ref={dialogRef} className="visitor-modal" aria-labelledby="visitor-title" aria-describedby="visitor-description" onClose={handleClose}>
        <button type="button" className="lottery-close" aria-label="暫時略過稱呼設定" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="eyebrow">A WARM WELCOME</p>
        <span className="visitor-symbol" aria-hidden="true">✧</span>
        <h2 id="visitor-title">在故事開始之前，<br />可以怎麼稱呼你？</h2>
        <p id="visitor-description">一個名字，或你喜歡的暱稱。<br />讓這裡成為專屬於你的小小角落。</p>
        <form onSubmit={submitName}>
          <label htmlFor="visitor-name">你的稱呼</label>
          <input ref={inputRef} id="visitor-name" name="nickname" type="text" autoComplete="nickname" maxLength={MAX_NAME_LENGTH} placeholder="例如：Iris、小月亮" aria-invalid={Boolean(error)} aria-describedby={error ? "visitor-error visitor-privacy" : "visitor-privacy"} onInput={() => setError("")} />
          <p id="visitor-error" className="visitor-error" role="alert">{error}</p>
          <button className="button visitor-submit" type="submit">開始我的塔羅日記 <span aria-hidden="true">↗</span></button>
        </form>
        <p id="visitor-privacy" className="visitor-privacy">最多 24 字。稱呼只保存在此瀏覽器，隨時可以修改。</p>
        <button className="visitor-skip" type="button" onClick={() => dialogRef.current?.close()}>先逛逛，晚點再說</button>
      </dialog>
    </>
  );
}
