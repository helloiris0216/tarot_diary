import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return { title: `${post.title}｜Iris Space`, description: post.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <article className="article-shell">
      <Link className="article-back" href="/blog">← 返回文章列表</Link>
      <header className="article-heading">
        <p className="eyebrow">IRIS SPACE / {post.category}</p>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      <div className="article-cover"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 900px) 90vw, 820px" /></div>
      <div className="article-body">
        {post.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <aside className="article-prompt"><p className="eyebrow">留給你的書寫練習</p><p>{post.prompt}</p></aside>
        <Link className="article-back" href="/blog">← 繼續閱讀其他文章</Link>
      </div>
    </article>
  );
}
