import Image from "next/image";
import Header from "@/app/components/header";
import DailyCardCta from "@/app/components/daily-card-cta";
import Footer from "@/app/components/footer";
import Parallax from "@/app/components/parallax";
import sources from "@/public/images/sources.json";

const entries = [
  { number: "01", label: "DAILY RITUAL", title: "一張牌，一段與自己的對話。", text: "替自己留五分鐘。抽一張牌，看看第一眼被什麼吸引，再把此刻的感受寫下來。", tags: "每日一牌 ／ 直覺練習", photo: 1 },
  { number: "02", label: "INNER VOICE", title: "在圖像裡，聽見心裡的聲音。", text: "一個顏色、一個姿態，都可能勾起不同的記憶。先記錄你的聯想，再慢慢閱讀牌義。", tags: "牌卡觀察 ／ 自我探索", photo: 7 },
  { number: "03", label: "SLOW REFLECTION", title: "讓日記，接住每一個當下。", text: "重新翻閱寫過的句子，看看情緒如何流動。那些反覆出現的問題，也值得溫柔地被看見。", tags: "日常紀錄 ／ 回望整理", photo: 8 },
];
const galleryPhotos = [3, 4, 5, 6, 9, 10];
const imageDescriptions: Record<number, string> = {
  1: "木桌上的塔羅牌與溫暖燭光", 2: "塔羅牌與蠟燭的靜物攝影", 3: "木盤上擺放的塔羅牌與水晶", 4: "燭光旁的牌卡", 5: "深色背景上的牌卡與蠟燭", 6: "手中拿著的塔羅牌", 7: "手正在鋪開塔羅牌", 8: "白色桌面上展開的經典塔羅牌", 9: "桌面上的塔羅牌陣", 10: "準備閱讀的塔羅牌陣",
};

export default function Home() {
  return (
    <div id="top">
      <Parallax />
      <a className="skip-link" href="#main">跳至主要內容</a>
      <Header />
      <main id="main">
        <div className="night-section"><section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> A QUIET MOMENT, JUST FOR YOU.</p>
            <h1 id="hero-title">翻開一張牌，<br />也翻開<span className="serif-emphasis">今天的自己。</span></h1>
            <DailyCardCta />
            <p className="hero-description">一本關於塔羅、直覺與生活的日記。<br />把匆忙放在一旁，留一點時間，聽聽心裡的聲音。</p>
            <div className="hero-footnote"><span>THE ART OF LOOKING INWARD</span><span>塔羅・書寫・日常</span></div>
          </div>
          <figure className="tarot-hero-photo"><div className="hero-image-frame" data-parallax><Image src="/images/tarot-02.jpg" alt={imageDescriptions[2]} fill priority sizes="(max-width: 700px) 90vw, 45vw" /></div><figcaption><span>THE TAROT JOURNAL</span><span>A little closer to yourself.</span></figcaption></figure>
        </section>
        </div>
        <section id="approach" className="approach shell"><p className="eyebrow">01 / A SPACE TO REFLECT</p><div><h2>有些答案，從好好聽自己開始。</h2><p>這裡是 Iris 的塔羅牌日記。藉由牌卡的圖像，整理那些還說不清楚的感受；用文字留住細小的發現。每次翻牌，都可以是一個認識自己的起點。</p></div><span className="signature">Iris</span></section>
        <section id="journal" className="learning shell"><div className="section-heading"><div><p className="eyebrow">02 / LITTLE EVERYDAY RITUALS</p><h2>把日常，寫成自己的故事。</h2></div><p>從一張牌、一個問題、一行文字開始。</p></div>
          <div className="topic-grid">{entries.map((entry) => <article className="topic" key={entry.number}><div className="entry-photo" data-parallax><Image src={`/images/tarot-${String(entry.photo).padStart(2, "0")}.jpg`} alt={imageDescriptions[entry.photo]} fill sizes="(max-width: 700px) 90vw, 30vw" /></div><div className="topic-meta"><span>{entry.number}</span><span>{entry.label}</span></div><h3>{entry.title}</h3><p>{entry.text}</p><div className="topic-tags">{entry.tags}</div></article>)}</div>
        </section>
        <section className="quiet-interlude" aria-label="留給自己的片刻">
          <div className="interlude-photo" data-parallax><Image src="/images/tarot-03.jpg" alt="" fill sizes="100vw" /></div>
          <div className="interlude-copy"><p className="eyebrow">BETWEEN THE CARDS &amp; THE QUIET</p><p className="interlude-quote">在燭光與牌卡之間，<br />讓心事，慢慢有了形狀。</p><span>Take your time. You are right where you need to be.</span></div>
        </section>
        <section id="notes" className="notes shell"><div className="notes-intro"><p className="eyebrow">03 / TODAY’S JOURNAL PROMPTS</p><h2>今天的你，<br />想對自己說些什麼？</h2><p>拿出你喜歡的牌與筆記本。<br />展開一個提問，讓思緒慢慢落在紙上。</p></div><div className="note-list">
          <details open><summary><span className="note-number">01</span>這張牌，讓我先注意到什麼？<span className="expand" aria-hidden="true" /></summary><p>先別急著查牌義。看看畫面中的人物、顏色和細節，寫下第一個浮現的詞，以及它讓你想到的生活片段。</p></details>
          <details><summary><span className="note-number">02</span>今天，我真正需要的是什麼？<span className="expand" aria-hidden="true" /></summary><p>是休息、陪伴，還是一點勇氣？把眼前的牌當作聯想的起點，試著用一句不帶批判的話，描述你此刻的需要。</p></details>
          <details><summary><span className="note-number">03</span>我能為自己做的一件小事？<span className="expand" aria-hidden="true" /></summary><p>把今天的感受化成一個小小的行動。可以是散步十分鐘、說出心裡的話，或允許自己慢一點。今晚，再回來記下感受。</p></details>
        </div></section>
        <section id="moments" className="moments shell"><div className="section-heading"><div><p className="eyebrow">04 / COLLECTED MOMENTS</p><h2>留一些安靜，在生活裡。</h2></div><p>牌卡、燭光，與留給自己的片刻。</p></div><div className="photo-gallery">{galleryPhotos.map((n) => <figure key={n}><div className="gallery-image" data-parallax><Image src={`/images/tarot-${String(n).padStart(2, "0")}.jpg`} alt={imageDescriptions[n]} fill sizes="(max-width: 700px) 43vw, 30vw" /></div><figcaption><span>NO. {String(n).padStart(2, "0")}</span><a href={sources[n-1].source} target="_blank" rel="noopener noreferrer" aria-label={`在 Unsplash 查看第 ${n} 張照片來源`}>Unsplash ↗</a></figcaption></figure>)}</div></section>
      </main>
      <Footer />
    </div>
  );
}
