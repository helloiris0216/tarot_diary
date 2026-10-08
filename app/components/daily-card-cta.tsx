import Link from "next/link";

export default function DailyCardCta() {
  return (
    <div className="hero-daily-action">
      <Link className="button hero-daily-button" href="/daily-card">
        <span aria-hidden="true">✧</span>
        <span>抽每日一卡</span>
        <span aria-hidden="true">↗</span>
      </Link>
      <p>每天一張牌，留一句話給今天的自己。</p>
    </div>
  );
}
