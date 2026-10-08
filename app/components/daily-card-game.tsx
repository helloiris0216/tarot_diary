"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { tarotCards } from "../data/tarot-cards";

const STORAGE_KEY = "iris-daily-card-v1";
type DailyDraw = { date: string; index: number };
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

function readSaved(date: string): DailyDraw | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    return value && value.date === date && Number.isInteger(value.index) && value.index >= 0 && value.index < tarotCards.length ? { date, index: value.index } : null;
  } catch { return null; }
}

export default function DailyCardGame() {
  const [date, setDate] = useState("");
  const [draw, setDraw] = useState<DailyDraw | null>(null);
  const [notice, setNotice] = useState("");
  const [animate, setAnimate] = useState(false);
  const currentDraw = useRef<DailyDraw | null>(null);

  useEffect(() => {
    function sync() {
      const day = today();
      let saved = currentDraw.current?.date === day ? currentDraw.current : null;
      try { saved = readSaved(day) ?? saved; } catch {
        setNotice("此瀏覽器無法保存結果；目前的牌卡僅保留至離開本頁。");
      }
      currentDraw.current = saved;
      setDate(day);
      setDraw(saved);
    }
    const frame = requestAnimationFrame(sync);
    const interval = setInterval(sync, 30000);
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function pickCard() {
    const day = today();
    let existing = currentDraw.current?.date === day ? currentDraw.current : null;
    try { existing = readSaved(day) ?? existing; } catch { /* In-memory fallback below. */ }
    if (existing) {
      currentDraw.current = existing;
      setDraw(existing);
      setDate(day);
      return;
    }
    // Reject the tail of the byte range so every card is equally likely.
    const bytes = new Uint8Array(1);
    const limit = 256 - (256 % tarotCards.length);
    do { crypto.getRandomValues(bytes); } while (bytes[0] >= limit);
    const result = { date: day, index: bytes[0] % tarotCards.length };
    currentDraw.current = result;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(result)); } catch {
      setNotice("此瀏覽器無法保存結果；目前的牌卡僅保留至離開本頁。");
    }
    setDate(day);
    setAnimate(true);
    setDraw(result);
  }

  const card = draw ? tarotCards[draw.index] : null;
  return (
    <div className="daily-game">
      <div className="daily-card-stage">
        <div className={`daily-card ${card ? "is-revealed" : ""} ${animate ? "with-flip" : ""}`}>
          <div className="daily-card-face daily-card-back" aria-hidden={Boolean(card)}>
            <p className="eyebrow">IRIS TAROT JOURNAL</p><span className="daily-card-mark" aria-hidden="true">✧</span><p className="daily-card-back-title">今日的你，<br />值得被好好聆聽。</p><span className="daily-card-caption">ONE CARD · ONE QUIET MOMENT</span>
          </div>
          <div className="daily-card-face daily-card-front" aria-hidden={!card}>
            {card && <><span className="daily-card-number">{String(draw!.index).padStart(2, "0")}</span><span className="daily-card-mark" aria-hidden="true">✧</span><h2>{card.name}</h2><p className="daily-card-english">{card.english}</p><span className="daily-card-keyword">{card.keyword}</span></>}
          </div>
        </div>
      </div>
      <div className="daily-reading">
        <p className="eyebrow">{date || "正在準備今日牌卡…"} / TAIPEI</p>
        <div role="status" aria-live="polite" aria-atomic="true">
          {card ? <><p className="daily-state">今日牌卡已揭曉</p><h2>{card.name} · {card.keyword}</h2><p className="daily-message">{card.message}</p><div className="daily-prompt"><p className="eyebrow">留給今天的一個問題</p><p>{card.question}</p></div></> : <><h2>深呼吸，<br />留一個片刻給自己。</h2><p className="daily-message">想一想此刻的心情，按下按鈕，<br />從 22 張大阿爾克那中抽出今日的一張牌。</p></>}
        </div>
        <button className="button daily-draw-button" type="button" onClick={pickCard} disabled={!date || Boolean(card)}>{!date ? "準備中…" : card ? "今天的牌，已為你保留" : "抽出我的每日一卡"}<span aria-hidden="true">{card ? "✓" : "↗"}</span></button>
        {card && <Link className="daily-journal-link" href="/blog/daily-one-card-journal">用這張牌，開始五分鐘書寫 ↗</Link>}
        <p className="daily-rules">以台灣時間午夜換日，同一瀏覽器每天保留一張牌。<br />本次使用 22 張大阿爾克那，不區分正逆位。<br />牌卡文字為自我探索提示，不是對未來的預測。</p>
        {notice && <p className="daily-notice" role="status">{notice}</p>}
      </div>
    </div>
  );
}
