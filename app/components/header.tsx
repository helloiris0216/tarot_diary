import Link from "next/link";
import LotteryModal from "./lottery-modal";

export default function Header() {
  return (
    <div className="masthead">
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Iris 塔羅牌日記首頁">
          iris<span className="brand-dot">.</span>
          <span className="brand-caption">TAROT JOURNAL</span>
        </Link>
        <nav aria-label="主要導覽">
          <Link href="/#approach">關於日記</Link>
          <Link href="/#journal">書寫練習</Link>
          <Link href="/blog">塔羅文章</Link>
          <Link href="/daily-card">每日一卡</Link>
          <Link className="nav-cta" href="/#notes">
            今日提問 <span aria-hidden="true">↗</span>
          </Link>
          <LotteryModal />
        </nav>
      </header>
    </div>
  );
}
