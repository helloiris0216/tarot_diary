import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import DailyCardGame from "../components/daily-card-game";

export const metadata: Metadata = {
  title: "每日一卡｜Iris Tarot Journal",
  description: "每天留一個安靜的片刻，抽出一張塔羅牌，閱讀今日的自我探索提示。",
};

export default function DailyCardPage() {
  return (
    <div id="top" className="blog-layout">
      <a className="skip-link" href="#main">跳至主要內容</a>
      <Header />
      <main id="main" className="daily-page">
        <div className="shell">
          <header className="daily-heading"><p className="eyebrow">YOUR DAILY RITUAL</p><h1>每日一卡，<span className="serif-emphasis">與自己相遇。</span></h1><p>把答案的期待，換成一份認識自己的好奇。</p></header>
          <DailyCardGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
