import type { Metadata } from "next";
import BlogCard from "../components/blog-card";
import { blogPosts } from "../data/blog-posts";

export const metadata: Metadata = {
  title: "塔羅文章｜Iris Space",
  description: "三篇關於每日一牌、溫柔提問與三張牌書寫練習的文章，陪你把塔羅帶進日常。",
};

export default function BlogPage() {
  return (
    <>
      <section className="blog-intro">
        <div className="shell">
          <p className="eyebrow">THE JOURNAL / WORDS TO COME HOME TO</p>
          <h1>在字裡行間，<br /><span className="serif-emphasis">慢慢讀懂自己。</span></h1>
          <p>關於塔羅、提問與書寫。<br />給想在日常裡，留一點安靜給自己的你。</p>
        </div>
      </section>
      <section className="shell blog-collection" aria-labelledby="articles-title">
        <div className="section-heading"><h2 id="articles-title">塔羅日記・文章集</h2><p>03 STORIES / 慢慢閱讀</p></div>
        <div className="blog-grid">{blogPosts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}</div>
      </section>
    </>
  );
}
