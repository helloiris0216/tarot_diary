"use client";

import { useEffect, useRef, useState } from "react";

type DrawState = "ready" | "drawing" | "won" | "missed";

export default function LotteryModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const [state, setState] = useState<DrawState>("ready");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
    }
  }, []);

  function openModal() {
    if (dialogRef.current?.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  function handleClose() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setState("ready");
    }
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    triggerRef.current?.focus();
  }

  function draw() {
    if (timerRef.current !== null) return;
    setState("drawing");
    setCopyMessage("");
    // Rejection sampling gives exactly 10 equally likely outcomes (0–9).
    const random = new Uint8Array(1);
    do { crypto.getRandomValues(random); } while (random[0] >= 250);
    const won = random[0] % 10 === 0;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setState(won ? "won" : "missed");
    }, delay);
  }

  async function copyCoupon() {
    try {
      await navigator.clipboard.writeText("IRIS90");
      setCopyMessage("已複製優惠碼");
    } catch {
      setCopyMessage("無法自動複製，請手動選取 IRIS90。");
    }
  }

  return (
    <>
      <button ref={triggerRef} className="lottery-trigger" type="button" onClick={openModal} aria-haspopup="dialog">
        <span aria-hidden="true">✧</span> 抽出我的小幸運
      </button>
      <dialog ref={dialogRef} className="lottery-modal" aria-labelledby="lottery-title" aria-describedby="lottery-description" onClose={handleClose}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}>
        <button className="lottery-close" type="button" aria-label="關閉抽獎視窗" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="eyebrow">A LITTLE GIFT FROM IRIS</p>
        <h2 id="lottery-title">給今天的你，一點小幸運。</h2>
        <p id="lottery-description" className="lottery-description">每次抽獎，都有 <strong>10%</strong> 機會獲得九折優惠券。<br />這一次，讓直覺帶你打開驚喜。</p>
        <div className={`lottery-result lottery-result--${state}`} role="status" aria-live="polite" aria-atomic="true">
          <span className="lottery-symbol" aria-hidden="true">✧</span>
          {state === "ready" && <><h3>留一份期待，給自己。</h3><p>準備好了，就揭曉今天的幸運。</p></>}
          {state === "drawing" && <><h3>正在揭曉你的小幸運…</h3><p>讓期待停留片刻。</p></>}
          {state === "won" && <><h3>恭喜你，抽中九折優惠券！</h3><p className="lottery-discount">10% OFF</p><p>優惠碼：<code>IRIS90</code></p><p className="lottery-demo">體驗優惠券，尚未開放實際兌換。</p></>}
          {state === "missed" && <><h3>這次與優惠券擦身而過。</h3><p>謝謝你的參與。再試一次，或帶著好心情繼續閱讀。</p></>}
        </div>
        {state === "won" && <><button type="button" className="lottery-copy" onClick={copyCoupon}>複製優惠碼</button><p className="lottery-copy-status" role="status">{copyMessage}</p></>}
        <button type="button" className="button lottery-draw" onClick={draw} disabled={state === "drawing"}>
          {state === "drawing" ? "抽獎中…" : state === "ready" ? "抽出我的小幸運" : "再抽一次"}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="lottery-rules">免費體驗・可重複抽獎・每次機率獨立計算<br />10% 為單次機率，不代表抽十次必定中獎。</p>
      </dialog>
    </>
  );
}
